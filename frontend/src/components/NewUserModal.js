import React from "react";
import { Modal } from "semantic-ui-react";
import RegisterForm from "./RegisterForm";
import usersService from "../services/usersService";

const NewUserModal = ({ modalOpen, onClose }) => {
	const handleSubmit = async (newUser) => {
		try {
			await usersService.registerUser(newUser);
			onClose();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal open={modalOpen} onClose={onClose} closeIcon>
			<Modal.Header>Add a new user</Modal.Header>
			<Modal.Content>
				<RegisterForm onSubmit={handleSubmit} />
			</Modal.Content>
		</Modal>
	);
};

export default NewUserModal;
