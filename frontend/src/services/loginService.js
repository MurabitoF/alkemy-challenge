import axios from "axios";

const baseUrl = "/api/login";

const login = async (credencials) => {
	const response = await axios.post(baseUrl, credencials);
	return response.data;
};

export default { login };
