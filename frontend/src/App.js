import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import TransactionsHub from "./components/TransactionsHub";
import TransactionsTable from "./components/TransactionsTable";
import transactionsService from "./services/transactionsService";

function App() {
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState({
		type: null,
		message: null,
	});
	const [lastTransactions, setLastTransactions] = useState([]);
	const [show, setShow] = useState("home");

	useEffect(() => {
		const fetchLastTransactions = async () => {
			const transactions = await transactionsService.getLastTransactions(
				10
			);
			setLastTransactions(transactions);
		};

		if (user) {
			fetchLastTransactions();
		}
	}, [user]);

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
							categories
							transactions={lastTransactions}
						/>
					</>
				)}
				{show === "transactions" && <TransactionsHub />}
			</Container>
		</>
	);
}

export default App;
