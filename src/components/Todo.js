import { Delete } from "@mui/icons-material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import { db } from "../firebaseConfig";

function Todo({ data }) {
	const { description, done, title, id } = data;
	const [isDone, setIsDone] = useState(done);
	const onDoneChange = (e) => {
		setIsDone(e.target.checked);
		const docRef = doc(db, "todo", id);
		updateDoc(docRef, {
			done: e.target.checked,
		});
	};

	const onDeleteTodo = () => {
		deleteDoc(doc(db, "todo", id));
	};

	return (
		<div style={{ marginTop: "1rem" }}>
			<Card style={{ backgroundColor: "#606266" }}>
				<Card.Body>
					<Card.Title
						style={{ color: "#fff", textDecoration: done ? "line-through" : "" }}
					>
						{title}
					</Card.Title>
					<Card.Subtitle
						style={{ color: "#fff", textDecoration: done ? "line-through" : "" }}
						className="mb-2 text-muted"
					>
						{description}
					</Card.Subtitle>
					<div style={{ textAlign: "center" }}>
						<Delete
							fontSize="large"
							onClick={onDeleteTodo}
							style={{ marginBottom: "1rem" }}
						/>
						<Form.Check
							style={{ display: "inline", fontSize: "1.7rem" }}
							value={isDone}
							onChange={onDoneChange}
							type="checkbox"
						/>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Todo;