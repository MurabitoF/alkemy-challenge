import axios from "axios";

const baseUrl = "http://localhost:3001/api/login/";

const login = async (credencials) => {
	const response = await axios.post(baseUrl, credencials);
	return response.data;
};

export default { login };
