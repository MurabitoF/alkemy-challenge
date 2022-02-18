import React, { useState, useEffect } from "react";
import { Modal, Loader } from "semantic-ui-react";
import TransactionForm from "./TransactionForm";
import typesService from "../services/typesService";
import categoriesService from "../services/categoriesService";

const UpdateTransactionModal = ({
	modalOpen,
	onClose,
	onSubmit,
	transaction,
}) => {
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
					<TransactionForm
						types={types}
						categories={categories}
						onSubmit={onSubmit}
						transaction={transaction}
					/>
				)}
			</Modal.Content>
		</Modal>
	);
};

export default UpdateTransactionModal;
