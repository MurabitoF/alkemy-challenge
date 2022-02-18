import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import BalanceCard from "./components/BalanceCard";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar/NavBar";
import TransactionsHub from "./components/TransactionHub/TransactionsHub";
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
	const [modalOpen, setModalOpen] = useState(false);
	const [toUpdate, setToUpdate] = useState(null);

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			transactionsService.setToken(user.token);
			setUser(user.email);
		}
	}, []);

	useEffect(() => {
		const fetchAllTransactions = async () => {
			try {
				const transactions =
					await transactionsService.getAllTransactions();
				setTransactions(transactions);
			} catch (error) {
				if (error.response.status === 401) {
					handleLogout();
				}
			}
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
			localStorage.setItem("loggedUser", JSON.stringify(user));
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
		localStorage.clear();
	};

	const open = (transaction) => {
		setToUpdate(transaction);
		setModalOpen(true);
	};
	const close = () => {
		setModalOpen(false);
		setToUpdate(null);
	};

	const removeTransaction = async (transaction) => {
		try {
			await transactionsService.removeTransaction(transaction);
			setTransactions(
				transactions.filter(
					(t) => t.transactionID !== transaction.transactionID
				)
			);
		} catch (error) {
			if (error.response.status === 401) {
				handleLogout();
			}
		}
	};

	const updateTransaction = async (transaction) => {
		try {
			const updatedTransaction =
				await transactionsService.updateTransaction(transaction);
			setTransactions(
				transactions.map((t) =>
					t.transactionID !== updatedTransaction.transactionID
						? t
						: updatedTransaction
				)
			);
			close();
		} catch (error) {
			console.log(error.response);
			if (error.response.status === 401) {
				handleLogout();
			}
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
						update={updateTransaction}
						toUpdate={toUpdate}
						updateModal={modalOpen}
						open={open}
						onClose={close}
					/>
				)}
			</Container>
		</>
	);
}

export default App;
