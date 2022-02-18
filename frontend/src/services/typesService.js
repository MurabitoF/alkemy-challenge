import axios from "axios";

const baseUrl = "/api/types";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	const data = response.data.map((type) => {
		return {
			key: type.typeID,
			value: type.typeID,
			text: type.name,
		};
	});
	return data;
};

export default { getAll };
