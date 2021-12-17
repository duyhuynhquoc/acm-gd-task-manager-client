import React from "react";
import { Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";

import "./TaskList.css";

export default function TaskList(props) {
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

	const awatingTask = (task) => {
		let index = "";

		if (props.tasks.awaiting !== "")
			props.tasks.map((t, i) => {
				if (t.taskId === task.awaiting) {
					index = i;
				}
				return task;
			});
		return index === "" ? "" : index + 1;
	};

	const editStatus = (event, task) => {
		const taskCell = event.target;

		// Get status value
		let status = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<select id="edit-status">
      <option value="To-do">To-do</option>
      <option value="In progress">In progess</option>
      <option value="Done">Done</option>
    </select>`;

		const submitStatus = (e) => {
			e.preventDefault();
			let newTasks = [...props.tasks];

			newTasks.map((t) => {
				if (t.taskId == task.taskId) {
					t.status = editStatusInput.value;
					props.updateTask(t.taskId, "status", editStatusInput.value);
				} else {
					if (t.awaiting == task.taskId) {
						if (editStatusInput.value === "Done") {
							t.availability = "Available";
							props.updateTask(t.taskId, "availability", "Available");
						} else {
							t.availability = "Unavailable";
							props.updateTask(t.taskId, "availability", "Unavailable");
						}
					}
				}
				return t;
			});

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
		let taskName = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-task-name-form"><textarea id="edit-task-name" autocomplete="off"/></form>`;

		const submitTaskName = (e) => {
			e.preventDefault();

			props.updateTask(task.taskId, "taskName", editTaskNameInput.value);

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
		let deadline = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-deadline-form"><input type="date" id="edit-deadline-input" autocomplete="off"/></form>`;

		const submitDeadline = (e) => {
			e.preventDefault();

			props.updateTask(task.taskId, "deadline", editDeadlineInput.value);

			editDeadlineInput.removeEventListener("focusout", submitDeadline);

			taskCell.innerHTML = editDeadlineInput.value;
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
		let assignee = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-assignee-form"><input type="text" id="edit-assignee-input" autocomplete="off"/></form>`;

		const submitAssignee = (e) => {
			e.preventDefault();
			let newTask = { ...task, assignee: editAssigneeInput.value };

			props.updateTask(task.taskId, "assignee", editAssigneeInput.value);

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
		let assigner = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-assigner-form"><input type="text" id="edit-assigner-input" autocomplete="off"/></form>`;

		const submitAssigner = (e) => {
			e.preventDefault();

			props.updateTask(task.taskId, "assigner", editAssignerInput.value);

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

	const editAwaiting = (event, task) => {
		const taskCell = event.target;

		// Get awaiting value
		let awaiting = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-awaiting-form"><input type="text" id="edit-awaiting-input" autocomplete="off" /></form>`;

		const submitAwaiting = (e) => {
			e.preventDefault();
			let availability = task.availability;
			let awaiting = props.tasks[editAwaitingInput.value - 1];
			if (!awaiting) {
				awaiting = "";
				availability = "Available";
			} else {
				availability = awaiting.status === "Done" ? "Available" : "Unavailable";
			}

			props.updateTask(task.taskId, "awaiting", awaiting.taskId);
			props.updateTask(task.taskId, "availability", availability);

			editAwaitingInput.removeEventListener("focusout", submitAwaiting);

			taskCell.innerHTML = !awaiting ? "" : editAwaitingInput.value;
		};

		// Focus on input
		const editAwaitingInput = document.querySelector("#edit-awaiting-input");
		editAwaitingInput.value = awaiting;
		editAwaitingInput.focus();

		// Prevent double click on input
		editAwaitingInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editAwaitingInput.addEventListener("focusout", submitAwaiting);

		// Submit form when press enter
		const editAwaitingForm = document.querySelector("#edit-awaiting-form");
		editAwaitingForm.addEventListener("submit", submitAwaiting);
	};

	const editNote = (event, task) => {
		const taskCell = event.target;

		// Get note value
		let note = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-note-form"><textarea id="edit-note" autocomplete="off"/></form>`;

		const submitNote = (e) => {
			e.preventDefault();

			props.updateTask(task.taskId, "note", editNoteInput.value);

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

	return (
		<div className="TaskList">
			<Table striped responsive hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>Status</th>
						<th>Availability</th>
						<th>Task</th>
						<th>Deadline</th>
						<th>Assignee</th>
						<th>Assigner</th>
						<th>Awaiting</th>
						<th>Note</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{props.tasks.map((task, index) => {
						let classList = colorTaskListRow(task);

						let awaitingTask = awatingTask(task);

						return (
							<tr className={classList} key={index + 1}>
								<td>{index + 1}</td>
								<td onDoubleClick={(event) => editStatus(event, task)}>
									{task.status}
								</td>
								<td
									className={`availability${
										task.availability === "Available" ? " available" : ""
									}`}
								>
									{task.availability}
								</td>
								<td onDoubleClick={(event) => editTaskName(event, task)}>
									{task.taskName}
								</td>
								<td onDoubleClick={(event) => editDeadline(event, task)}>
									{task.deadline}
								</td>
								<td onDoubleClick={(event) => editAssignee(event, task)}>
									{task.assignee}
								</td>
								<td onDoubleClick={(event) => editAssigner(event, task)}>
									{task.assigner}
								</td>
								<td onDoubleClick={(event) => editAwaiting(event, task)}>
									{awaitingTask}
								</td>
								<td onDoubleClick={(event) => editNote(event, task)}>
									{task.note}
								</td>
								<td>
									<div className="delete-btn">
										<AiFillCloseCircle
											className="delete-btn-icon"
											onClick={() => {
												props.deleteTask(task.taskId);
											}}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
