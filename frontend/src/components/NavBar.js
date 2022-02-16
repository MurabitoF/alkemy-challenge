import React from "react";
import { Menu, Header, Button } from "semantic-ui-react";

const NavBar = ({ user, handleLogout, setShow }) => {
	return (
		<Menu fixed="top">
			<Menu.Item>
				<Header size="large">Money Management</Header>
			</Menu.Item>

			<Menu.Menu>
				<Menu.Item>
					<Button onClick={() => setShow("home")}>Home</Button>
				</Menu.Item>
				<Menu.Item>
					<Button onClick={() => setShow("transactions")}>
						My transactions
					</Button>
				</Menu.Item>
			</Menu.Menu>

			<Menu.Menu position="right">
				<Menu.Item>
					<Header as={"h3"}>{user}</Header>
				</Menu.Item>
				<Menu.Item>
					<Button color="black" onClick={handleLogout}>
						Logout
					</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default NavBar;
