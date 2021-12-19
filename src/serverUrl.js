const serverUrl = () => {
	if (process.env.NODE_ENV === "production") return process.env.SERVER_URL;
	if (process.env.NODE_ENV === "development") return "http://localhost:5000";
};

export default serverUrl();
