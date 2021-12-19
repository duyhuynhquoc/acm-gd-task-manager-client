import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "./serverUrl";

import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";
import TaskInput from "./components/TaskInput/TaskInput";

export default function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		axios.get(`${url}/api/`).then((res) => {
			setTasks(res.data);
		});
	}, []);

	const createTask = (newTask) => {
		setTasks([newTask, ...tasks]);

		// Create new task on database
		axios.post(`${url}/api/`, newTask).then((res) => {});
	};

	const deleteTask = (deleteId) => {
		// Delete task by taskId
		let newTasks = tasks.filter((task) => task.taskId !== deleteId);

		// Update tasks' availability
		newTasks.map((task) => {
			if (task.awaiting === deleteId) {
				task.availability = "Available";
			}
			axios
				.put(`${url}/api/`, {
					updateId: task.taskId,
					updateField: "availability",
					updateValue: "Available",
				})
				.then((res) => {});
			return task;
		});

		setTasks(newTasks);

		// Delete task on database
		axios.delete(`${url}/api/`, { data: { deleteId } }).then((res) => {});
	};

	const updateTask = (updateId, updateField, updateValue) => {
		let newTasks = tasks.map((task) => {
			if (task.taskId === updateId) {
				task[updateField] = updateValue;
			}
			return task;
		});

		setTasks(newTasks);

		// Update task on database
		axios
			.put(`${url}/api/`, { updateId, updateField, updateValue })
			.then((res) => {});
	};

	return (
		<div className="App">
			<NavBar />
			<div className="container-md py-4">
				<TaskInput createTask={createTask} tasks={tasks} />
				<TaskList
					tasks={tasks}
					deleteTask={deleteTask}
					updateTask={updateTask}
					setTasks={setTasks}
				/>
			</div>
		</div>
	);
}
