import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import BalanceCard from "./components/BalanceCard";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import TransactionsHub from "./components/TransactionsHub";
import TransactionsTable from "./components/TransactionsTable";
import transactionsService from "./services/transactionsService";
import loginService from "./services/loginService";

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

		if (user) {
			fetchAllTransactions();
		}
	}, [user]);

	const handleLogin = async (formData) => {
		try {
			const user = await loginService.login(formData);
			setUser(user.email);
			transactionsService.setToken(user.token);
		} catch (error) {
			setNotification({
				type: "error",
				message: error.response.data,
			});
			setInterval(() => {
				setNotification({ type: null, notification: null });
			}, 5000);
		}
	};

	const handleLogout = () => {
		setUser(null);
		setTransactions([]);
		setShow("home");
		transactionsService.setToken("");
	};

	const removeTransaction = async (transaction) => {
		if (window.confirm(`Do you want to delete ${transaction.details}?`)) {
			await transactionsService.removeTransaction(transaction);
			setTransactions(
				transactions.filter(
					(t) => t.transactionID !== transaction.transactionID
				)
			);
		}
	};

	if (!user) {
		return <LoginForm notification={notification} onSubmit={handleLogin} />;
	}

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout} setShow={setShow} />
			<Container style={{ marginTop: "6em" }}>
				<Header size="huge">Hi, {user}</Header>
				{show === "home" && (
					<>
						<BalanceCard transactions={transactions} />
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
						remove={removeTransaction}
					/>
				)}
			</Container>
		</>
	);
}

export default App;
