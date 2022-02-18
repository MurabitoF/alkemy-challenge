import React from "react";
import { Header, Segment } from "semantic-ui-react";

const BalanceCard = ({ transactions }) => {
	const total = transactions.reduce((sum, transaction) => {
		return transaction.type.name === "income"
			? sum + transaction.value
			: sum - transaction.value;
	}, 0);

	return (
		<Segment
			color={total >= 0 ? "green" : "red"}
			inverted
			tertiary
			textAlign="center"
		>
			<Header as={"h3"}>Balance: {total}</Header>
		</Segment>
	);
};

export default BalanceCard;
