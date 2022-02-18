import React, { useState } from "react";
import { Menu, Header, Button, Grid } from "semantic-ui-react";
import DesktopMenu from "./DesktopMenu";
import MovileMenu from "./MovileMenu";

const NavBar = ({ user, handleLogout, setShow }) => {
	const [visible, setVisible] = useState(false);

	const hide = () => setVisible(false);

	return (
		<Grid>
			<Grid.Row only=" computer">
				<DesktopMenu
					user={user}
					handleLogout={handleLogout}
					setShow={setShow}
				/>
			</Grid.Row>
			<Grid.Row only="mobile tablet">
				<Menu borderless style={{ width: "100%" }}>
					<Menu.Item>
						<Header size="large">Money Management</Header>
					</Menu.Item>
					<Menu.Item position="right">
						<Button
							color="black"
							icon={"bars"}
							onClick={() => setVisible(true)}
						/>
					</Menu.Item>
					<MovileMenu
						user={user}
						handleLogout={handleLogout}
						setShow={setShow}
						visible={visible}
						onHide={hide}
					/>
				</Menu>
			</Grid.Row>
		</Grid>
	);
};

export default NavBar;
