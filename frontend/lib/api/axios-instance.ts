import axios from "axios";

const axiosInstance = axios.create(
	{
		baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		}
	}
);

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		const status = error.response?.status;
		// TODO: Uncomment when missing events and notifications are resolved
		// window.location.href = status === 500 ? "/internal-server-error" : "/not-found";
		return Promise.reject(error.response?.data);
	},
);
export default axiosInstance;

