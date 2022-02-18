import React, { useState } from "react";
import { useFormik } from "formik";
import { Header, Button, Form, Container, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import Notification from "./Notification";
import NewUserModal from "./NewUserModal";

const LoginSchema = Yup.object({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const styles = {
	container: {
		textAling: "center",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
	},
	form: {
		boxShadow:
			"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
		padding: "1em",
		borderRadius: 5,
		backgroundColor: "#F2F2F3",
	},
	button: {
		width: "100%",
	},
};

const LoginForm = ({ notification, onSubmit }) => {
	const [register, setRegister] = useState(false);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: onSubmit,
	});

	const openModal = () => {
		setRegister(true);
	};
	const closeModal = () => {
		setRegister(false);
	};

	return (
		<Grid centered style={styles.container}>
			<Grid.Column mobile={16} tablet={8} computer={4}>
				<Header size="large" textAlign="center">
					Login
				</Header>
				<Form style={styles.form} onSubmit={formik.handleSubmit}>
					<Notification notification={notification} />
					<Form.Input
						type="text"
						placeholder="Email"
						name="email"
						onChange={formik.handleChange}
						error={formik.errors.email && true}
					/>
					<Form.Input
						type="password"
						placeholder="Password"
						name="password"
						onChange={formik.handleChange}
						error={formik.errors.password && true}
					/>
					<Button type="submit" primary style={styles.button}>
						Login
					</Button>
					<NewUserModal modalOpen={register} onClose={closeModal} />
					<Button as={"a"} onClick={openModal}>
						Create new user
					</Button>
				</Form>
			</Grid.Column>
		</Grid>
	);
};

export default LoginForm;
