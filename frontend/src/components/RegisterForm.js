import React from "react";
import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";

const RegisterSchema = Yup.object({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const RegisterForm = ({ onSubmit }) => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: RegisterSchema,
		onSubmit: onSubmit,
	});

	return (
		<Form onSubmit={formik.handleSubmit}>
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
			<Button type="submit" primary>
				Create user
			</Button>
		</Form>
	);
};

export default RegisterForm;
