import axios from "axios";

const baseApi = axios.create(
	{
		baseURL: "http://localhost:8000",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		}
	}
);

baseApi.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
export default baseApi;