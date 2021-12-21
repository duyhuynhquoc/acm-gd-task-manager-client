import React, { useState } from "react";
import { OverlayTrigger, Popover, Button, ToggleButton } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";

import "./TaskFilter.css";

export default function TaskFilter() {
	const [statusFilter, setStatusFilter] = useState({
		done: true,
		todo: true,
		inProgress: true,
	});

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>
				<div>
					<p>Status</p>
					<ToggleButton
						variant="outline-primary"
						size="sm"
						id="toggle-done"
						type="checkbox"
						checked={statusFilter.done}
						onChange={(e) =>
							setStatusFilter({
								...statusFilter,
								done: e.currentTarget.checked,
							})
						}
					>
						Done
					</ToggleButton>
					<ToggleButton
						variant="outline-primary"
						size="sm"
						id="toggle-todo"
						type="checkbox"
						checked={statusFilter.todo}
						onChange={(e) =>
							setStatusFilter({
								...statusFilter,
								todo: e.currentTarget.checked,
							})
						}
					>
						To-do
					</ToggleButton>
					<ToggleButton
						variant="outline-primary"
						size="sm"
						id="toggle-in-progress"
						type="checkbox"
						checked={statusFilter.inProgress}
						onChange={(e) =>
							setStatusFilter({
								...statusFilter,
								inProgress: e.currentTarget.checked,
							})
						}
					>
						In progress
					</ToggleButton>
				</div>
			</Popover.Body>
		</Popover>
	);

	return (
		<div className="TaskFilter pb-4 col-md-1">
			<OverlayTrigger trigger="click" placement="right" overlay={popover}>
				<Button variant="light" size="sm">
					Filter <IoMdArrowDropdown />
				</Button>
			</OverlayTrigger>
		</div>
	);
}
