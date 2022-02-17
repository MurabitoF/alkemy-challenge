import React, { useState, useEffect } from "react";
import { Button, Table, Header, Pagination } from "semantic-ui-react";

const TransactionsTable = ({ categories, actions, transactions }) => {
	const [filteredTransactions, setFilteredTransactions] = useState([]);

	useEffect(() => {
		setFilteredTransactions(transactions.slice(0, 10));
	}, [transactions]);

	if (!transactions.length) {
		return <Header as={"h3"}>No transactions registered</Header>;
	}

	const handlePageChange = (nbrPage) => {
		console.log(nbrPage === 1);
		if (nbrPage === 1) {
			return setFilteredTransactions(transactions.slice(0, 10));
		}
		if (transactions.length - 10 * nbrPage < transactions.length) {
			return setFilteredTransactions(
				transactions.slice(10 * (nbrPage - 1))
			);
		}
		setFilteredTransactions(transactions.slice(10 * (nbrPage - 1), 10));
	};
	console.log(filteredTransactions, transactions);
	return (
		<>
			<Table color="blue">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Type</Table.HeaderCell>
						<Table.HeaderCell>Details</Table.HeaderCell>
						<Table.HeaderCell>Value</Table.HeaderCell>
						<Table.HeaderCell>Date</Table.HeaderCell>
						{categories ? (
							<Table.HeaderCell>Category</Table.HeaderCell>
						) : null}

						{actions ? (
							<Table.HeaderCell>Actions</Table.HeaderCell>
						) : null}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{filteredTransactions.map((transaction) => {
						return (
							<Table.Row key={transaction.transactionID}>
								<Table.Cell>{transaction.type.name}</Table.Cell>
								<Table.Cell>{transaction.details}</Table.Cell>
								<Table.Cell>{transaction.value}</Table.Cell>
								<Table.Cell>
									{new Date().toJSON().slice(0, 10)}
								</Table.Cell>
								{categories ? (
									<Table.Cell>
										{transaction.category?.name}
									</Table.Cell>
								) : null}
								{actions ? (
									<Table.Cell>
										<Button color="blue" icon={"pencil"} />
										<Button color="red" icon={"trash"} />
									</Table.Cell>
								) : null}
							</Table.Row>
						);
					})}
				</Table.Body>
				{transactions.length / 10 > 1 && (
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan={6}>
								<Pagination
									defaultActivePage={1}
									totalPages={Math.ceil(
										transactions.length / 10
									)}
									onPageChange={(e, data) =>
										handlePageChange(data.activePage)
									}
								/>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				)}
			</Table>
		</>
	);
};

export default TransactionsTable;
