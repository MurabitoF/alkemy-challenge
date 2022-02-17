import React from "react";
import { Formik } from "formik";
import {
	Form,
	Select,
	SubmitButton,
	ResetButton,
	Input,
} from "formik-semantic-ui-react";
import * as Yup from "yup";
import { Grid } from "semantic-ui-react";

const TransactionSchema = Yup.object({
	type: Yup.string().required("Type is required"),
	category: Yup.string().when("type", {
		is: "2",
		then: Yup.string().required("Category is required"),
	}),
	details: Yup.string().required("Details is required"),
	value: Yup.number()
		.min(0, "Value must be greater than 0")
		.required("Value is required"),
});

const NewTransactionForm = ({ types, categories, onSubmit }) => {
	return (
		<Formik
			initialValues={{
				type: "",
				category: "",
				details: "",
				value: "",
				date: "",
			}}
			onSubmit={(values) => onSubmit(values)}
			validationSchema={TransactionSchema}
		>
			{(props) => (
				<Form>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column>
								<Select
									name="type"
									options={types}
									errorPrompt
									label="Type"
								/>
							</Grid.Column>
							<Grid.Column>
								{props.values.type === 2 && (
									<Select
										name="category"
										options={categories}
										errorPrompt
										label="Category"
									/>
								)}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Input
									name="details"
									type="text"
									placeholder="Details"
									label="Details"
									errorPrompt
								/>
							</Grid.Column>
							<Grid.Column>
								<Input
									name="value"
									type="number"
									placeholder="Value"
									label="Value"
									errorPrompt
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Input
									name="date"
									type="date"
									label="Date"
									errorPrompt
								/>
							</Grid.Column>
						</Grid.Row>
						<SubmitButton color="green">Add</SubmitButton>
						<ResetButton color="red">Clear</ResetButton>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default NewTransactionForm;
