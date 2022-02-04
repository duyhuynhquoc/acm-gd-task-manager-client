import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import {
	FaTasks,
	FaCalendarCheck,
	FaUser,
	FaPen,
	FaCheckSquare,
	FaUserFriends,
} from "react-icons/fa";

import "./TaskInput.css";

export default function TaskInput(props) {
	const [task, setTask] = useState({
		taskName: "",
		deadline: "",
		board: "",
		assignee: "",
		assigner: "",
		awaiting: "",
		note: "",
	});

	const handleChange = (event, field) => {
		setTask({ ...task, [field]: event.target.value });
	};

	const expandTaskInputFocus = () => {
		const taskInput = document.querySelector(".TaskInput");
		const taskDetail = document.querySelector(".task-detail");

		if (
			document.activeElement === taskInput ||
			taskInput.contains(document.activeElement)
		) {
			taskDetail.classList.add("show");
		} else {
			taskDetail.classList.remove("show");
		}
	};

	// Expand task input when focus the TaskInput
	setInterval(() => {
		expandTaskInputFocus();
	}, 300);

	const handleSubmit = (event) => {
		event.preventDefault();

		let awaitingOrd = task.awaiting.split(",");

		let awaiting = [];
		awaitingOrd.forEach((a) => {
			let i = props.tasks.length - a.trim();
			if (!isNaN(i) && i >= 0 && i < props.tasks.length)
				awaiting.push(props.tasks[i].taskId);
		});

		let newTask = {
			taskId: uuidv4(),
			status: "To-do",
			taskName: task.taskName,
			deadline: task.deadline,
			board: task.board,
			assignee: task.assignee,
			assigner: task.assigner,
			awaiting: awaiting,
			note: task.note,
		};

		props.createTask(newTask);

		setTask({
			taskName: "",
			deadline: "",
			board: "",
			assignee: "",
			assigner: "",
			awaiting: "",
			note: "",
			awaiting: [],
		});
	};

	return (
		<Col tabIndex="1" className="TaskInput pb-4" md={6} lg={4}>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="FormGroup mb-3">
					<FaTasks className="fa-icon me-2" />
					<FormControl
						type="text"
						placeholder="Add new task"
						onChange={(event) => {
							handleChange(event, "taskName");
						}}
						value={task.taskName}
					/>
				</Form.Group>
				<div className="task-detail">
					<Row>
						<Col sm={6}>
							<Form.Group className="FormGroup mb-3">
								<FaCalendarCheck className="fa-icon me-2" />
								<FormControl
									type="date"
									value={task.deadline}
									onChange={(event) => {
										handleChange(event, "deadline");
									}}
								/>
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form.Group className="FormGroup mb-3">
								<FaUserFriends className="fa-icon me-2" />
								<Form.Select
									aria-label="Default select example"
									onChange={(event) => {
										handleChange(event, "board");
									}}
									value={task.board}
								>
									<option>Board</option>
									<option value="Expertise">Expertise</option>
									<option value="Logistics">Logistics</option>
									<option value="Communication">Communication</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col sm={6}>
							<Form.Group className="FormGroup mb-3">
								<FaUser className="fa-icon me-2" />
								<FormControl
									type="text"
									placeholder="Assignee"
									value={task.assignee}
									onChange={(event) => {
										handleChange(event, "assignee");
									}}
								/>
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form.Group className="FormGroup mb-3">
								<FaUser className="fa-icon me-2" />
								<FormControl
									type="text"
									placeholder="Assigner"
									onChange={(event) => {
										handleChange(event, "assigner");
									}}
									value={task.assigner}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group className="FormGroup mb-3">
						<FaCheckSquare className="fa-icon me-2" />
						<FormControl
							type="text"
							placeholder="Awaiting (1, 2, 3, ...)"
							onChange={(event) => {
								handleChange(event, "awaiting");
							}}
							value={task.awaiting}
						/>
					</Form.Group>

					<Form.Group className="FormGroup mb-3">
						<FaPen className="fa-icon me-2" />
						<FormControl
							as="textarea"
							placeholder="Note"
							onChange={(event) => {
								handleChange(event, "note");
							}}
							value={task.note}
						/>
					</Form.Group>

					<Button className="btn " type="submit">
						Add
					</Button>
				</div>
			</Form>
		</Col>
	);
}
