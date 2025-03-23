import React from 'react'
import { Link } from 'react-router-dom'
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../api/apiSlice'

function TaskCard({ task }) {
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    try {
      await updateTask({ id: task.id, ...task, status: newStatus }).unwrap()
    } catch (error) {
      console.error('Status update failed', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(task.id).unwrap()
    } catch (error) {
      console.error('Delete failed', error)
    }
  }

  const deadlineDate = new Date(task.deadline)
  const day = deadlineDate.getDate()
  const month = deadlineDate.toLocaleString('default', { month: 'short' })

  return (
    <div className="task">
      <div className="flex items-center gap-2 text-slate">
        <h2 className="date">{day}</h2>
        <h4 className="month">{month}</h4>
      </div>
      <div className="taskContainer">
        <h1 className="task-title">{task.taskName}</h1>
        <span className={`task-badge ${task.project.colorClass}`}>
          {task.project.projectName}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* <img src={task.teamMember.avatar} alt={task.teamMember.name} className="team-avater" /> */}
          <p className="task-assignedOn">{task.teamMember.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/edit/${task.id}`} className="edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-indigo-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19.5 7.125L16.862 4.487" />
            </svg>
          </Link>
          <button className="delete" onClick={handleDelete}>
            <svg 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-red-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
        <select className="status" value={task.status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="complete">Completed</option>
        </select>
      </div>
    </div>
  )
}

export default TaskCard
