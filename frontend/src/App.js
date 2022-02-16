import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import LoginForm from "./components/LoginForm";

function App() {
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState({
		type: null,
		message: null,
	});

	useEffect(() => {
		const loggedUser = localStorage.getItem("loggedUser");
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setUser(user);
		}
	}, []);

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
			<Container fluid style={{ padding: "0.5em 1.5em" }}>
				{" "}
				<Header size="large">Money Management</Header>
			</Container>
			<Container>
				<Header size="huge">Hola</Header>{" "}
			</Container>
		</>
	);
}

export default App;
