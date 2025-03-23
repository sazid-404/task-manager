import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TaskList from '../components/TaskList'
import { useGetTasksQuery } from '../api/apiSlice'

function Home() {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProjects, setSelectedProjects] = useState([
    'Scoreboard',
    'Flight Booking',
    'Product Cart',
    'Book Store',
    'Blog Application',
    'Job Finder',
  ])

  // Filter tasks based on search and selected projects
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = selectedProjects.includes(task.project.projectName)
    return matchesSearch && matchesProject
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleProjectToggle = (projectName, isChecked) => {
    if (isChecked) {
      setSelectedProjects([...selectedProjects, projectName])
    } else {
      setSelectedProjects(selectedProjects.filter((p) => p !== projectName))
    }
  }

  return (
    <div>
      <Navbar searchValue={searchTerm} onSearchChange={handleSearchChange} />
      <div className="container relative flex">
        <Sidebar onProjectToggle={handleProjectToggle} selectedProjects={selectedProjects} />
        <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
          {/* + Add New Button */}
          <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
            <Link to="/add" className="addnew group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 group-hover:text-indigo-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="group-hover:text-indigo-500">Add New</span>
            </Link>
          </div>
          {isLoading ? (
            <p>Loading tasks...</p>
          ) : isError ? (
            <p>Error loading tasks</p>
          ) : (
            <TaskList tasks={filteredTasks} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
