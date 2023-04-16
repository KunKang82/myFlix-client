import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Validation of user login
	const handleSubmit = (event) => {
		// this prevents the default behavior of the form which is to reload the entire page
		event.preventDefault();

		const data = {
			access: username,
			secret: password
		};

		// fetch("https://openlibrary.org/account/login.json", {
		//   method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		//   body: JSON.stringify(data)
		// }).then((response) => {
		// 	if (response.ok) {
		// 		onLoggedIn(username);				
		// 	} else {
		// 		alert("login failed");
		// 	}
		// });

		fetch("https://myflix-movie-api.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Login response: ", data);
				//   if (data.user) {
				//     onLoggedIn(data.user, data.token);
				//   } else {
				//     alert("No such user");
				//   }
				// })
				if (data.user) {
					localStorage.setItem("user", JSON.stringify(data.user));
					localStorage.setItem("token", data.token);
					onLoggedIn(data.user, data.token);
				} else {
					alert("No such user");
				}
			})
			.catch((e) => {
				alert("Something went wrong");
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
			<label>
				Password:
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<button type="submit">Submit</button>
		</form>
	);
};
