import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { AiFillCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import TaskFilter from "../TaskFilter/TaskFilter";

import "./TaskList.css";

export default function TaskList(props) {
	const [filters, setFilters] = useState({
		status: {
			done: true,
			todo: true,
			inProgress: true,
		},
		board: {
			expertise: true,
			logistics: true,
			communication: true,
			none: true,
		},
	});

	const [tasks, setTasks] = useState(props.tasks);

	useEffect(() => {
		setTasks(props.tasks);
	}, [props.tasks]);

	useEffect(() => {
		let newTasks = props.tasks.filter((task) => {
			let validStatus = false;
			if (
				(task.status === "To-do" && filters.status.todo) ||
				(task.status === "In progress" && filters.status.inProgress) ||
				(task.status === "Done" && filters.status.done)
			) {
				validStatus = true;
			}

			let validBoard = false;
			if (
				(task.board === "Expertise" && filters.board.expertise) ||
				(task.board === "Logistics" && filters.board.logistics) ||
				(task.board === "Communication" && filters.board.communication) ||
				(task.board === "" && filters.board.none)
			) {
				validBoard = true;
			}

			if (validStatus && validBoard) return task;
		});

		setTasks(newTasks);
	}, [filters]);

	const updateFilters = (newFilters) => {
		setFilters(newFilters);
	};

	// Color rows depends on deadlines
	const colorTaskListRow = (task) => {
		let deadlineDate = new Date(task.deadline);
		deadlineDate.setHours(0, 0, 0, 0);
		let todayDate = new Date();
		todayDate.setHours(0, 0, 0, 0);

		if (task.status === "Done") {
			return "table-success";
		} else if (deadlineDate < todayDate) {
			return "table-danger";
		} else if (deadlineDate.getTime() === todayDate.getTime()) {
			return "table-warning";
		}
	};

	const findAwatingTaskOrders = (task) => {
		let indexList = [];
		let awaitingTasks = task.awaiting;

		awaitingTasks.forEach((awatingTaskId) => {
			let index = -1;
			props.tasks.map((t, i) => {
				if (t.taskId === awatingTaskId) {
					index = i;
				}
			});

			indexList.push(index);
		});

		return indexList;
	};

	const checkAvailability = (awaitingTaskOrders) => {
		let availability = "Available";
		awaitingTaskOrders.map((a) => {
			if (props.tasks[a].status !== "Done") availability = "Unvailable";
		});
		return availability;
	};

	const editBoard = (event, task) => {
		// stopPropagation();
		let taskCell = event.target;

		if (taskCell.getAttribute("class") !== "cell") {
			taskCell = taskCell.parentElement;
		}

		// Get board value
		let board = task.board;

		// Change text into input
		taskCell.innerHTML = `<select id="edit-board">
      <option value="Expertise">Expertise</option>
      <option value="Logistics">Logistics</option>
      <option value="Communication">Communication</option>
      <option value="">None</option>
    </select>`;

		const submitBoard = (e) => {
			e.preventDefault();
			let newTasks = [...tasks];

			let updateTasks = [];

			props.updateTasks(updateTasks);

			if (task.taskId == task.taskId) {
				task.board = editStatusInput.value;
				updateTasks.push({
					updateId: task.taskId,
					updateField: "board",
					updateValue: editStatusInput.value,
				});
			}

			props.updateTasks(updateTasks);

			props.setTasks(newTasks);
			board = editStatusInput.value.slice(0, 3);
			taskCell.innerHTML = `<div class="${board}">${board}</div>`;
		};

		// Focus on input
		const editStatusInput = document.querySelector("#edit-board");
		editStatusInput.value = board;
		editStatusInput.focus();

		// Prevent double click on input
		editStatusInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editStatusInput.addEventListener("focusout", submitBoard);

		// No need to submit when press enter
	};

	const editStatus = (event, task) => {
		const taskCell = event.target;

		// Get status value
		let status = task.status;

		// Change text into input
		taskCell.innerHTML = `<select id="edit-status">
      <option value="To-do">To-do</option>
      <option value="In progress">In progess</option>
      <option value="Done">Done</option>
    </select>`;

		const submitStatus = (e) => {
			e.preventDefault();
			let newTasks = [...tasks];

			let updateTasks = [];

			props.updateTasks(updateTasks);

			newTasks.map((t) => {
				if (t.taskId == task.taskId) {
					t.status = editStatusInput.value;
					updateTasks.push({
						updateId: t.taskId,
						updateField: "status",
						updateValue: editStatusInput.value,
					});
				} else {
					if (t.awaiting == task.taskId) {
						if (editStatusInput.value === "Done") {
							t.availability = "Available";
							updateTasks.push({
								updateId: t.taskId,
								updateField: "availability",
								updateValue: "Available",
							});
						} else {
							t.availability = "Unavailable";
							updateTasks.push({
								updateId: t.taskId,
								updateField: "availability",
								updateValue: "Unavailable",
							});
						}
					}
				}
				return t;
			});

			props.updateTasks(updateTasks);

			props.setTasks(newTasks);
			taskCell.innerHTML = editStatusInput.value;
		};

		// Focus on input
		const editStatusInput = document.querySelector("#edit-status");
		editStatusInput.value = status;
		editStatusInput.focus();

		// Prevent double click on input
		editStatusInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editStatusInput.addEventListener("focusout", submitStatus);

		// No need to submit when press enter
	};

	const editTaskName = (event, task) => {
		const taskCell = event.target;

		// Get taskName value
		let taskName = task.taskName;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-task-name-form"><textarea id="edit-task-name" style="width: 100%" autocomplete="off"/></form>`;

		const submitTaskName = (e) => {
			e.preventDefault();

			let updateTasks = [
				{
					updateId: task.taskId,
					updateField: "taskName",
					updateValue: editTaskNameInput.value,
				},
			];

			props.updateTasks(updateTasks);

			editTaskNameInput.removeEventListener("focusout", submitTaskName);

			taskCell.innerHTML = editTaskNameInput.value;
		};

		// Focus on input
		const editTaskNameInput = document.querySelector("#edit-task-name");
		editTaskNameInput.value = taskName;
		editTaskNameInput.focus();

		// Prevent double click on input
		editTaskNameInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editTaskNameInput.addEventListener("focusout", submitTaskName);

		// Submit form when press enter
		const editTaskNameForm = document.querySelector("#edit-task-name-form");
		editTaskNameForm.addEventListener("submit", submitTaskName);
	};

	const editDeadline = (event, task) => {
		const taskCell = event.target;

		// Get deadline value
		let deadline = task.deadline;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-deadline-form"><input type="date" style="width: 100%" id="edit-deadline-input" autocomplete="off"/></form>`;

		const submitDeadline = (e) => {
			e.preventDefault();

			let newDeadline = editDeadlineInput.value;

			let updateTasks = [
				{
					updateId: task.taskId,
					updateField: "deadline",
					updateValue: newDeadline,
				},
			];

			props.updateTasks(updateTasks);

			editDeadlineInput.removeEventListener("focusout", submitDeadline);

			taskCell.innerHTML =
				newDeadline === ""
					? ""
					: `${newDeadline.slice(5, 7)}/${newDeadline.slice(
							8,
							10
					  )}/${newDeadline.slice(0, 4)}`;
		};

		// Focus on input
		const editDeadlineInput = document.querySelector("#edit-deadline-input");
		editDeadlineInput.value = deadline;
		editDeadlineInput.focus();

		// Prevent double click on input
		editDeadlineInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editDeadlineInput.addEventListener("focusout", submitDeadline);

		// Submit form when press enter
		const editDeadlineForm = document.querySelector("#edit-deadline-form");
		editDeadlineForm.addEventListener("submit", submitDeadline);
	};

	const editAssignee = (event, task) => {
		const taskCell = event.target;

		// Get assignee value
		let assignee = task.assignee;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-assignee-form"><input type="text" style="width: 100%" id="edit-assignee-input" autocomplete="off"/></form>`;

		const submitAssignee = (e) => {
			e.preventDefault();

			let updateTasks = [
				{
					updateId: task.taskId,
					updateField: "assignee",
					updateValue: editAssigneeInput.value,
				},
			];

			props.updateTasks(updateTasks);

			editAssigneeInput.removeEventListener("focusout", submitAssignee);

			taskCell.innerHTML = editAssigneeInput.value;
		};

		// Focus on input
		const editAssigneeInput = document.querySelector("#edit-assignee-input");
		editAssigneeInput.value = assignee;
		editAssigneeInput.focus();

		// Prevent double click on input
		editAssigneeInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editAssigneeInput.addEventListener("focusout", submitAssignee);

		// Submit form when press enter
		const editAssigneeForm = document.querySelector("#edit-assignee-form");
		editAssigneeForm.addEventListener("submit", submitAssignee);
	};

	const editAssigner = (event, task) => {
		const taskCell = event.target;

		// Get assigner value
		let assigner = task.assigner;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-assigner-form"><input type="text" style="width: 100%" id="edit-assigner-input" autocomplete="off"/></form>`;

		const submitAssigner = (e) => {
			e.preventDefault();

			let updateTasks = [
				{
					updateId: task.taskId,
					updateField: "assigner",
					updateValue: editAssignerInput.value,
				},
			];

			props.updateTasks(updateTasks);

			editAssignerInput.removeEventListener("focusout", submitAssigner);

			taskCell.innerHTML = editAssignerInput.value;
		};

		// Focus on input
		const editAssignerInput = document.querySelector("#edit-assigner-input");
		editAssignerInput.value = assigner;
		editAssignerInput.focus();

		// Prevent double click on input
		editAssignerInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editAssignerInput.addEventListener("focusout", submitAssigner);

		// Submit form when press enter
		const editAssignerForm = document.querySelector("#edit-assigner-form");
		editAssignerForm.addEventListener("submit", submitAssigner);
	};

	const editNote = (event, task) => {
		const taskCell = event.target;

		// Get note value
		let note = task.note;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-note-form"><textarea id="edit-note" style="width: 100%" autocomplete="off"/></form>`;

		const submitNote = (e) => {
			e.preventDefault();

			let updateTasks = [
				{
					updateId: task.taskId,
					updateField: "note",
					updateValue: editNoteInput.value,
				},
			];

			props.updateTasks(updateTasks);

			editNoteInput.removeEventListener("focusout", submitNote);

			taskCell.innerHTML = editNoteInput.value;
		};

		// Focus on input
		const editNoteInput = document.querySelector("#edit-note");
		editNoteInput.value = note;
		editNoteInput.focus();

		// Prevent double click on input
		editNoteInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editNoteInput.addEventListener("focusout", submitNote);

		// Submit form when press enter
		const editNoteForm = document.querySelector("#edit-note-form");
		editNoteForm.addEventListener("submit", submitNote);
	};

	const addAwaitingTask = (event, task) => {
		let addAwaitingTaskBtn = event.currentTarget;
		let addAwaitingTaskForm = addAwaitingTaskBtn.parentElement;
		let addAwaitingTaskInput = addAwaitingTaskForm.querySelector(
			".add-awaiting-task-input"
		);

		addAwaitingTaskInput.classList.remove("hide");
		addAwaitingTaskInput.focus();

		const submitAwaitingTask = (e) => {
			e.preventDefault();

			// [Todo]: Add awaiting task

			let awaitingTask = tasks.length - addAwaitingTaskInput.value;

			if (awaitingTask >= 0 && awaitingTask < tasks.length) {
				let superiorTaskId = task.taskId;
				let subordinateTaskId = tasks[awaitingTask].taskId;

				props.createAwaitingTask(superiorTaskId, subordinateTaskId);
			}

			addAwaitingTaskInput.value = "";
			addAwaitingTaskForm.removeEventListener("submit", submitAwaitingTask);
			addAwaitingTaskBtn.removeEventListener("click", submitAwaitingTask);

			addAwaitingTaskInput.classList.add("hide");
		};

		addAwaitingTaskInput.addEventListener("focusout", () => {
			addAwaitingTaskInput.classList.add("hide");
		});

		addAwaitingTaskForm.addEventListener("submit", submitAwaitingTask);
		addAwaitingTaskBtn.addEventListener("click", submitAwaitingTask);
	};

	return (
		<div className="TaskList">
			<TaskFilter updateFilters={updateFilters} />
			<Table striped responsive hover bordered>
				<thead>
					<tr>
						<th></th>
						<th>Id</th>
						<th>Status</th>
						<th>Availability</th>
						<th className="col-sm-3">Task</th>
						<th className="col-sm-1">Deadline</th>
						<th className="col-sm-1">Assignee</th>
						<th className="col-sm-1">Assigner</th>
						<th className="col-sm-1">Awaiting</th>
						<th className="col-sm-3">Note</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{tasks.map((task, index) => {
						let rowClassList = colorTaskListRow(task);

						let board = task.board.slice(0, 3);

						let awaitingTaskOrders = findAwatingTaskOrders(task);

						let availability = checkAvailability(awaitingTaskOrders);

						return (
							<tr className={rowClassList} key={index + 1}>
								<td
									className="cell"
									onDoubleClick={(event) => editBoard(event, task)}
								>
									<div className={board}>{board}</div>
								</td>
								<td>{tasks.length - index}</td>
								<td onDoubleClick={(event) => editStatus(event, task)}>
									{task.status}
								</td>
								<td
									className={`availability${
										availability === "Available" ? " greenText" : " redText"
									}`}
								>
									{availability}
								</td>
								<td onDoubleClick={(event) => editTaskName(event, task)}>
									{task.taskName}
								</td>
								<td onDoubleClick={(event) => editDeadline(event, task)}>
									{task.deadline === ""
										? ""
										: `${task.deadline.slice(5, 7)}/${task.deadline.slice(
												8,
												10
										  )}/${task.deadline.slice(0, 4)}`}
								</td>
								<td onDoubleClick={(event) => editAssignee(event, task)}>
									{task.assignee}
								</td>
								<td onDoubleClick={(event) => editAssigner(event, task)}>
									{task.assigner}
								</td>

								<td>
									{awaitingTaskOrders.map((awaitingTask, i) => {
										return (
											<div className="awaiting-task" key={i}>
												<div
													className={`content ${
														props.tasks[awaitingTask].status === "Done"
															? "green"
															: "red"
													}-background`}
												>
													{tasks.length - awaitingTask}
												</div>
												<AiFillCloseCircle
													className="delete-btn-icon"
													onClick={() => {
														props.deleteAwaitingTask(
															task.taskId,
															tasks[awaitingTask].taskId
														);
													}}
												/>
											</div>
										);
									})}
									<div className="add-awaiting-task">
										<form>
											<input
												className="add-awaiting-task-input hide"
												type="text"
											/>
											<AiOutlinePlusCircle
												className="add-awaiting-task-btn-icon"
												onClick={(event) => addAwaitingTask(event, task)}
											/>
										</form>
									</div>
								</td>

								<td
									onDoubleClick={(event) => editNote(event, task)}
									style={{
										whiteSpace: "pre-wrap",
										textAlign: "left",
										paddingLeft: "20px",
										paddingRight: "20px",
									}}
								>
									{task.note}
								</td>
								<td>
									<AiFillCloseCircle
										className="delete-btn-icon"
										onClick={() => {
											props.deleteTask(task.taskId);
										}}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
