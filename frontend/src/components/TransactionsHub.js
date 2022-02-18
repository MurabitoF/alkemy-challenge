import React, { useState } from "react";
import { Button, Tab } from "semantic-ui-react";
import TransactionsTable from "./TransactionsTable";
import transactionsService from "../services/transactionsService";
import NewTransactionModal from "./NewTransactionModal";

const TransactionsHub = ({
	transactions,
	setTransactions,
	remove,
	update,
	toUpdate,
	updateModal,
	open,
	onClose,
}) => {
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	const submitNewTransaction = async (values) => {
		try {
			const savedTransaction =
				await transactionsService.postNewTransaction(values);
			setTransactions([savedTransaction, ...transactions]);
			closeModal();
		} catch (error) {
			console.log(error);
		}
	};

	const panes = [
		{
			menuItem: "All",
			render: () => (
				<TransactionsTable
					remove={remove}
					update={update}
					toUpdate={toUpdate}
					modalOpen={updateModal}
					open={open}
					onClose={onClose}
					actions
					categories
					transactions={transactions}
				/>
			),
		},
		{
			menuItem: "Income",
			render: () => (
				<TransactionsTable
					remove={remove}
					update={update}
					toUpdate={toUpdate}
					modalOpen={updateModal}
					open={open}
					onClose={onClose}
					actions
					transactions={transactions.filter(
						(t) => t.type.name === "income"
					)}
				/>
			),
		},
		{
			menuItem: "Expenses",
			render: () => (
				<TransactionsTable
					remove={remove}
					update={update}
					toUpdate={toUpdate}
					modalOpen={updateModal}
					open={open}
					onClose={onClose}
					actions
					categories
					menu={true}
					transactions={transactions.filter(
						(t) => t.type.name === "expense"
					)}
				/>
			),
		},
	];

	return (
		<>
			<Tab menu={{ color: "blue", inverted: true }} panes={panes} />{" "}
			<NewTransactionModal
				modalOpen={modalOpen}
				onClose={closeModal}
				onSubmit={submitNewTransaction}
			/>
			<Button
				style={{ marginTop: "0.5em" }}
				color="green"
				onClick={() => openModal()}
			>
				Add transaction
			</Button>
		</>
	);
};

export default TransactionsHub;
