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

export default { setToken, getAllTransactions, getLastTransactions };
