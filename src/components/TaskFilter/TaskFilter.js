import React, { useState } from "react";
import { OverlayTrigger, Popover, Button, ToggleButton } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";

import "./TaskFilter.css";

export default function TaskFilter(props) {
	const [filters, setFilters] = useState({
		status: {
			done: true,
			todo: true,
			inProgress: true,
		},
		board: {
			expertise: true,
			programme: true,
			communications: true,
			none: true,
		},
	});

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>
				<div>
					<div className="pb-2">Status</div>
					<div className="popover-btn-group pb-3">
						<ToggleButton
							className="popover-btn"
							variant="outline-primary"
							size="sm"
							id="toggle-done"
							type="checkbox"
							checked={filters.status.done}
							onChange={(e) => {
								{
									setFilters({
										...filters,
										status: {
											...filters.status,
											done: e.currentTarget.checked,
										},
									});
								}
								props.updateFilters({
									...filters,
									status: {
										...filters.status,
										done: e.currentTarget.checked,
									},
								});
							}}
						>
							Done
						</ToggleButton>

						<ToggleButton
							className="popover-btn"
							variant="outline-primary"
							size="sm"
							id="toggle-todo"
							type="checkbox"
							checked={filters.status.todo}
							onChange={(e) => {
								setFilters({
									...filters,
									status: {
										...filters.status,
										todo: e.currentTarget.checked,
									},
								});
								props.updateFilters({
									...filters,
									status: {
										...filters.status,
										todo: e.currentTarget.checked,
									},
								});
							}}
						>
							To-do
						</ToggleButton>
						<ToggleButton
							className="popover-btn"
							variant="outline-primary"
							size="sm"
							id="toggle-in-progress"
							type="checkbox"
							checked={filters.status.inProgress}
							onChange={(e) => {
								setFilters({
									...filters,
									status: {
										...filters.status,
										inProgress: e.currentTarget.checked,
									},
								});
								props.updateFilters({
									...filters,
									status: {
										...filters.status,
										inProgress: e.currentTarget.checked,
									},
								});
							}}
						>
							In progress
						</ToggleButton>
					</div>

					<div className="pb-2">Board</div>
					<div className="popover-btn-group">
						<ToggleButton
							className="popover-btn"
							variant="outline-primary"
							size="sm"
							id="toggle-expertise"
							type="checkbox"
							checked={filters.board.expertise}
							onChange={(e) => {
								{
									setFilters({
										...filters,
										board: {
											...filters.board,
											expertise: e.currentTarget.checked,
										},
									});
								}
								props.updateFilters({
									...filters,
									board: {
										...filters.board,
										expertise: e.currentTarget.checked,
									},
								});
							}}
						>
							Expertise
						</ToggleButton>

						<ToggleButton
							className="popover-btn"
							variant="outline-primary"
							size="sm"
							id="toggle-programme"
							type="checkbox"
							checked={filters.board.programme}
							onChange={(e) => {
								setFilters({
									...filters,
									board: {
										...filters.board,
										programme: e.currentTarget.checked,
									},
								});
								props.updateFilters({
									...filters,
									board: {
										...filters.board,
										programme: e.currentTarget.checked,
									},
								});
							}}
						>
							Programme
						</ToggleButton>
						<ToggleButton
							className="popover-btn"
							variant="outline-primary"
							size="sm"
							id="toggle-communications"
							type="checkbox"
							checked={filters.board.communications}
							onChange={(e) => {
								setFilters({
									...filters,
									board: {
										...filters.board,
										communications: e.currentTarget.checked,
									},
								});
								props.updateFilters({
									...filters,
									board: {
										...filters.board,
										communications: e.currentTarget.checked,
									},
								});
							}}
						>
							Communications
						</ToggleButton>
						<ToggleButton
							className="popover-btn"
							variant="outline-primary"
							size="sm"
							id="toggle-none"
							type="checkbox"
							checked={filters.board.none}
							onChange={(e) => {
								{
									setFilters({
										...filters,
										board: {
											...filters.board,
											none: e.currentTarget.checked,
										},
									});
								}
								props.updateFilters({
									...filters,
									board: {
										...filters.board,
										none: e.currentTarget.checked,
									},
								});
							}}
						>
							None
						</ToggleButton>
					</div>
				</div>
			</Popover.Body>
		</Popover>
	);

	return (
		<div className="TaskFilter pb-4 col-md-1">
			<OverlayTrigger trigger="click" placement="right" overlay={popover}>
				<Button variant="light" size="sm">
					Filters <IoMdArrowDropdown />
				</Button>
			</OverlayTrigger>
		</div>
	);
}
