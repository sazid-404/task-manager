import React from 'react'
import { useGetProjectsQuery, useGetTeamQuery } from '../api/apiSlice'
import { Link } from 'react-router-dom'

function Sidebar({ onProjectToggle, selectedProjects }) {
  const { data: projects = [] } = useGetProjectsQuery()
  const { data: team = [] } = useGetTeamQuery()

  const handleCheckboxChange = (e, projectName) => {
    onProjectToggle(projectName, e.target.checked)
  }

  return (
    <div className="sidebar">
      {/* Projects List */}
      <div>
        <h3 className="text-xl font-bold">Projects</h3>
        <div className="mt-3 space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className="checkbox-container">
              <input
                type="checkbox"
                className={proj.colorClass}
                checked={selectedProjects.includes(proj.projectName)}
                onChange={(e) => handleCheckboxChange(e, proj.projectName)}
              />
              <p className="label">{proj.projectName}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Team Members */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        <div className="mt-3 space-y-4">
          {team.map((member) => (
            <div key={member.id} className="checkbox-container">
              {/* <img src={member.avatar} alt={member.name} className="team-avater" /> */}
              <p className="label">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Add New Task Button */}
      {/* <div className="mt-8">
        <Link to="/add" className="addnew group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="group-hover:text-indigo-500">Add New</span>
        </Link>
      </div> */}
    </div>
  )
}

export default Sidebar
