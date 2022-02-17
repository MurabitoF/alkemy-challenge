import React from "react";
import { Button, Table, Header } from "semantic-ui-react";

const TransactionsTable = ({ categories, actions, transactions }) => {
	if (!transactions.length) {
		return <Header as={"h3"}>No transactions registered</Header>;
	}

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
					{transactions.map((transaction) => {
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
			</Table>
		</>
	);
};

export default TransactionsTable;
