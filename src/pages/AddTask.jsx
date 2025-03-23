import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetTeamQuery, useGetProjectsQuery, useAddTaskMutation } from '../api/apiSlice'
import Navbar from '../components/Navbar'

function AddTask() {
  const navigate = useNavigate()
  const { data: team = [] } = useGetTeamQuery()
  const { data: projects = [] } = useGetProjectsQuery()
  const [addTask] = useAddTaskMutation()

  const [formData, setFormData] = useState({
    taskName: '',
    teamMemberId: '',
    projectId: '',
    deadline: '',
    status: 'pending',
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Find team member and project objects
    const teamMember = team.find(member => member.id.toString() === formData.teamMemberId)
    const project = projects.find(proj => proj.id.toString() === formData.projectId)
    const newTask = {
      taskName: formData.taskName,
      teamMember,
      project,
      deadline: formData.deadline,
      status: 'pending',
    }
    try {
      await addTask(newTask).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to add task', error)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container relative">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Create Task for Your Team
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
                  placeholder="Implement RTK Query"
                  onChange={handleChange}
                />
              </div>
              <div className="fieldContainer">
                <label>Assign To</label>
                <select name="teamMemberId" id="teamMember" required onChange={handleChange}>
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
                <select id="projectName" name="projectId" required onChange={handleChange}>
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
                <input type="date" name="deadline" id="deadline" required onChange={handleChange} />
              </div>
              <div className="text-right">
                <button type="submit" className="submit">Save</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddTask
