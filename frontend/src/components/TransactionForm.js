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

const TransactionForm = ({ types, categories, onSubmit, transaction }) => {
	return (
		<Formik
			initialValues={{
				type: transaction ? transaction.type.typeID : "",
				category: transaction ? transaction.category.categoryID : "",
				details: transaction ? transaction.details : "",
				value: transaction ? transaction.value : "",
				date: transaction ? transaction.date.slice(0, 19) : "",
				transactionID: transaction ? transaction.transactionID : "",
			}}
			onSubmit={(values) => onSubmit(values)}
			validationSchema={TransactionSchema}
		>
			{(props) => (
				<Form>
					{transaction && (
						<>
							<input
								name="transactionID"
								onChange={props.handleChange}
								style={{ display: "none" }}
							/>
							<input
								name="type"
								onChange={props.handleChange}
								style={{ display: "none" }}
							/>
						</>
					)}

					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column mobile={16} tablet={8} computer={8}>
								<Select
									name="type"
									disabled={transaction ? true : false}
									options={types}
									errorPrompt
									label="Type"
								/>
							</Grid.Column>
							<Grid.Column mobile={16} tablet={8} computer={8}>
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
							<Grid.Column mobile={16} tablet={8} computer={8}>
								<Input
									name="details"
									type="text"
									placeholder="Details"
									label="Details"
									errorPrompt
								/>
							</Grid.Column>
							<Grid.Column mobile={16} tablet={8} computer={8}>
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
							<Grid.Column mobile={16} tablet={8} computer={8}>
								<Input
									name="date"
									type="datetime-local"
									label="Date"
									errorPrompt
								/>
							</Grid.Column>
						</Grid.Row>
						<SubmitButton color="green">
							{transaction ? "Update" : "Add"}
						</SubmitButton>
						<ResetButton color="red">Clear</ResetButton>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default TransactionForm;
