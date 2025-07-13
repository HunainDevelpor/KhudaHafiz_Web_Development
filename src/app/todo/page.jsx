"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (fetchedTasks.length > 0) {
      setTasks(fetchedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.title.trim() === "" || input.description.trim() === "") {
      alert("Please enter a title and description for the task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: input.title,
      description: input.description,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput({ title: "", description: "" });
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleDeleteCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-gray-600 to-gray-900 flex flex-col items-center justify-start p-6">
        <h1 className="text-4xl font-bold text-white mb-6">Todo List</h1>

        <div className="w-full max-w-md">
          <fieldset className="bg-gray-800 border border-gray-300 rounded-lg p-6 shadow-lg">
            <h4 className="text-xl font-semibold text-white mb-4">Task Details</h4>

            <div className="mb-4">
              <label className="block text-gray-300 font-medium mb-1">Title</label>
              <input
                type="text"
                placeholder="Write title here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-1">Description</label>
              <input
                type="text"
                placeholder="Write description here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input.description}
                onChange={(e) => setInput({ ...input, description: e.target.value })}
              />
            </div>

            <button
              onClick={handleAddTask}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Task
            </button>
          </fieldset>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`p-4 bg-gray-600 rounded-lg shadow-md ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg text-white font-semibold">{task.title}</h3>
                      <p className="text-gray-100">{task.description}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={handleDeleteCompleted}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 w-full sm:w-auto"
              >
                Delete Completed Tasks
              </button>
              <button
                onClick={handleDeleteAll}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 w-full sm:w-auto"
              >
                Delete All Tasks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Fixed bottom-left back button */}
      <div className="fixed bottom-8 left-4 z-50">
        <Link
          href="/"
          className="bg-gray-600 border border-gray-100 text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-700 transition duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    </>
  );
}
