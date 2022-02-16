import React from "react";
import { Button, Table, Loader } from "semantic-ui-react";

const TransactionsTable = ({ categories, actions, transactions }) => {
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
				{!transactions ? (
					<Loader inverted>Loading</Loader>
				) : (
					<Table.Body>
						{transactions.map((transaction) => {
							return (
								<Table.Row key={transaction.transactionID}>
									<Table.Cell>
										{transaction.type.name}
									</Table.Cell>
									<Table.Cell>
										{transaction.details}
									</Table.Cell>
									<Table.Cell>{transaction.value}</Table.Cell>
									<Table.Cell>
										{new Date()
											.toJSON()
											.slice(0, 19)
											.replace("T", " ")}
									</Table.Cell>
									{categories ? (
										<Table.Cell>
											{transaction.category.name}
										</Table.Cell>
									) : null}
									{actions ? (
										<Table.Cell>
											<Button
												color="blue"
												icon={"pencil"}
											/>
											<Button
												color="red"
												icon={"trash"}
											/>
										</Table.Cell>
									) : null}
								</Table.Row>
							);
						})}
					</Table.Body>
				)}
			</Table>
		</>
	);
};

export default TransactionsTable;
