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

		let updateAvailabilityTask = [];

		// Update tasks' availability
		newTasks.map((task) => {
			if (task.awaiting === deleteId) {
				task.availability = "Available";

				updateAvailabilityTask.push({
					updateId: task.taskId,
					updateField: "availability",
					updateValue: "Available",
				});
			}

			return task;
		});

		setTasks(newTasks);

		axios
			.put(`${url}/api/`, { updateTasks: updateAvailabilityTask })
			.then((res) => {});

		// Delete task on database
		axios.delete(`${url}/api/`, { data: { deleteId } }).then((res) => {});
	};

	const updateTasks = (updateTasks) => {
		let newTasks = tasks.map((task) => {
			updateTasks.forEach((t) => {
				if (task.taskId === t.updateId) {
					task[t.updateField] = t.updateValue;
				}
			});

			return task;
		});

		setTasks(newTasks);

		// Update task on database
		axios.put(`${url}/api/`, { updateTasks }).then((res) => {});
	};

	return (
		<div className="App">
			<NavBar />
			<div className="container-md py-4">
				<TaskInput createTask={createTask} tasks={tasks} />
				<TaskList
					tasks={tasks}
					deleteTask={deleteTask}
					updateTasks={updateTasks}
					setTasks={setTasks}
				/>
			</div>
		</div>
	);
}
