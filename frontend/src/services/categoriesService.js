import axios from "axios";

const baseUrl = "/api/categories";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	const data = response.data.map((category) => {
		return {
			key: category.categoryID,
			value: category.categoryID,
			text: category.name,
		};
	});
	return data;
};

export default { getAll };
