import React, { useState, useEffect } from "react";
import { Modal, Loader } from "semantic-ui-react";
import NewTransactionForm from "./NewTransactionForm";
import categoriesService from "../services/categoriesService";
import typesService from "../services/typesService";

const NewTransactionModal = ({ modalOpen, onClose, onSubmit }) => {
	const [types, setTypes] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const categories = await categoriesService.getAll();
			const types = await typesService.getAll();

			setTypes(types);
			setCategories(categories);
		};
		fetchData();
	}, []);

	return (
		<Modal open={modalOpen} onClose={onClose} closeIcon>
			<Modal.Header>Add a new transaction</Modal.Header>
			<Modal.Content>
				{!types.length && !categories.length ? (
					<Loader inverted>Loading</Loader>
				) : (
					<NewTransactionForm
						types={types}
						categories={categories}
						onSubmit={onSubmit}
					/>
				)}
			</Modal.Content>
		</Modal>
	);
};

export default NewTransactionModal;
