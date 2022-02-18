import axios from "axios";

const baseUrl = "/api/transactions";

let token;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAllTransactions = async () => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.get(baseUrl, config);
	return response.data;
};

const getLastTransactions = async (limit) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.get(`${baseUrl}/${limit}`, config);
	return response.data;
};

const postNewTransaction = async (newTransaction) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(baseUrl, newTransaction, config);
	return response.data;
};

const removeTransaction = async (transaction) => {
	const id = transaction.transactionID;
	const config = {
		headers: { Authorization: token },
	};
	await axios.delete(`${baseUrl}/${id}`, config);
};

const updateTransaction = async (transaction) => {
	const id = transaction.transactionID;
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.put(`${baseUrl}/${id}`, transaction, config);
	return response.data;
};

export default {
	setToken,
	getAllTransactions,
	getLastTransactions,
	postNewTransaction,
	removeTransaction,
	updateTransaction,
};
