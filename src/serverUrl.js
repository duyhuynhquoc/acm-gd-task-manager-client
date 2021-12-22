let serverUrl = "http://localhost:5000";

if (process.env.REACT_APP_NODE_ENV === "production")
	serverUrl = process.env.REACT_APP_SERVER_URL;
if (process.env.REACT_APP_NODE_ENV === "development")
	serverUrl = "http://localhost:5000";

export default serverUrl;
