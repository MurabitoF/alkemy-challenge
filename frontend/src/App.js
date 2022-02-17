import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import TransactionsHub from "./components/TransactionsHub";
import TransactionsTable from "./components/TransactionsTable";
import transactionsService from "./services/transactionsService";

function App() {
	const [transactions, setTransactions] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState({
		type: null,
		message: null,
	});
	const [show, setShow] = useState("home");

	useEffect(() => {
		const fetchAllTransactions = async () => {
			const transactions = await transactionsService.getAllTransactions();
			setTransactions(transactions);
		};

		fetchAllTransactions();
	}, []);

	const handleLogout = () => {
		setUser(null);
		transactionsService.setToken("");
	};

	if (!user) {
		return (
			<LoginForm
				setUser={setUser}
				notification={notification}
				setNotification={setNotification}
			/>
		);
	}

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout} setShow={setShow} />
			<Container style={{ marginTop: "6em" }}>
				<Header size="huge">Hi, {user}</Header>
				{show === "home" && (
					<>
						<Header size="medium">Last transactions</Header>
						<TransactionsTable
							transactions={transactions.slice(0, 10)}
						/>
					</>
				)}
				{show === "transactions" && (
					<TransactionsHub
						transactions={transactions}
						setTransactions={setTransactions}
					/>
				)}
			</Container>
		</>
	);
}

export default App;
