import React, { useState, useEffect } from "react";
import { Tab } from "semantic-ui-react";
import TransactionsTable from "./TransactionsTable";
import transactionsService from "../services/transactionsService";

const TransactionsHub = () => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchAllTransactions = async () => {
			const transactions = await transactionsService.getAllTransactions();
			setTransactions(transactions);
		};
		fetchAllTransactions();
	}, []);

	const panes = [
		{
			menuItem: "All",
			render: () => (
				<TransactionsTable
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
					actions
					categories
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
					actions
					categories
					transactions={transactions.filter(
						(t) => t.type.name === "expense"
					)}
				/>
			),
		},
	];

	return <Tab menu={{ color: "blue", inverted: true }} panes={panes} />;
};

export default TransactionsHub;
