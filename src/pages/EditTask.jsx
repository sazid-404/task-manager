import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetTasksQuery, useGetTeamQuery, useGetProjectsQuery, useUpdateTaskMutation } from '../api/apiSlice'
import Navbar from '../components/Navbar'

function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: tasks = [] } = useGetTasksQuery()
  const { data: team = [] } = useGetTeamQuery()
  const { data: projects = [] } = useGetProjectsQuery()
  const [updateTask] = useUpdateTaskMutation()

  const taskToEdit = tasks.find(task => task.id.toString() === id)

  const [formData, setFormData] = useState({
    taskName: '',
    teamMemberId: '',
    projectId: '',
    deadline: '',
    status: 'pending',
  })

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        taskName: taskToEdit.taskName,
        teamMemberId: taskToEdit.teamMember.id.toString(),
        projectId: taskToEdit.project.id.toString(),
        deadline: taskToEdit.deadline,
        status: taskToEdit.status || 'pending',
      })
    }
  }, [taskToEdit])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Find team member and project objects
    const teamMember = team.find(member => member.id.toString() === formData.teamMemberId)
    const project = projects.find(proj => proj.id.toString() === formData.projectId)
    const updatedTask = {
      id: taskToEdit.id,
      taskName: formData.taskName,
      teamMember,
      project,
      deadline: formData.deadline,
      status: formData.status,
    }
    try {
      await updateTask(updatedTask).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to update task', error)
    }
  }

  if (!taskToEdit) {
    return <p>Task not found</p>
  }

  return (
    <div>
      <Navbar />
      <div className="container relative">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Edit Task
          </h1>
          <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="fieldContainer">
                <label htmlFor="taskName">Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  id="taskName"
                  required
                  value={formData.taskName}
                  onChange={handleChange}
                />
              </div>
              <div className="fieldContainer">
                <label>Assign To</label>
                <select name="teamMemberId" id="teamMember" required value={formData.teamMemberId} onChange={handleChange}>
                  <option value="" hidden>Select Job</option>
                  {team.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fieldContainer">
                <label htmlFor="projectName">Project Name</label>
                <select id="projectName" name="projectId" required value={formData.projectId} onChange={handleChange}>
                  <option value="" hidden>Select Project</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.projectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fieldContainer">
                <label htmlFor="deadline">Deadline</label>
                <input type="date" name="deadline" id="deadline" required value={formData.deadline} onChange={handleChange} />
              </div>
              <div className="fieldContainer">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="complete">Completed</option>
                </select>
              </div>
              <div className="text-right">
                <button type="submit" className="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditTask
