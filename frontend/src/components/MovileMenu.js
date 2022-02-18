import React from "react";
import { Menu, Button, Header, Sidebar, Icon } from "semantic-ui-react";

const MovileMenu = ({ user, handleLogout, setShow, onHide, visible }) => {
	return (
		<Sidebar
			as={Menu}
			vertical
			borderless
			animation="overlay"
			icon="labeled"
			onHide={onHide}
			visible={visible}
			width="wide"
		>
			<Menu.Item position="right">
				<Icon link name="close" onClick={onHide} size="mini" />
			</Menu.Item>
			<Menu.Item style={{ marginTop: "2em" }}>
				<Header as={"h3"}>{user} </Header>
			</Menu.Item>

			<Menu.Item>
				<Button
					onClick={() => {
						setShow("home");
						onHide();
					}}
				>
					Home
				</Button>
			</Menu.Item>
			<Menu.Item>
				<Button
					onClick={() => {
						setShow("transactions");
						onHide();
					}}
				>
					My transactions
				</Button>
			</Menu.Item>

			<Menu.Item>
				<Button color="black" onClick={handleLogout}>
					Logout
				</Button>
			</Menu.Item>
		</Sidebar>
	);
};

export default MovileMenu;
