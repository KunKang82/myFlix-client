import { useState } from "react";

// Import Form and Button Bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Validation of user login
	const handleSubmit = (event) => {
		// this prevents the default behavior of the form which is to reload the entire page
		event.preventDefault();

		const data = {
			Username: username,
			Password: password
		};

		fetch("https://myflix-movie-api.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Something went wrong");
      });

		// fetch("https://myflix-movie-api.herokuapp.com/login", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(data)
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log("Login response: ", data);
		// 		if (data) {
		// 			localStorage.setItem("user", JSON.stringify(data.user));
		// 			// localStorage.setItem("password", JSON.stringify(data.password));
		// 			localStorage.setItem("token", data.token);
		// 			onLoggedIn(data.user, data.token);
		// 			// onLoggedIn(data.user, data.password, data.token);
		// 		} else {
		// 			alert("No such user");
		// 		}
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 		alert("Something went wrong");
		// 	});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlID="formUsername">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					minLength="3"
					placeholder="Please enter your Username"
					pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
					title="Username should contain more than 3 characters, may only contain letters, numbers and special characters: .,'-!?%&"
				/>
			</Form.Group>

			<Form.Group controlID="formPassword">
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Please enter your Password"
					pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
					title="Password may only contain letters, numbers and special characters: .,'-!?%&"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">Log in</Button>
		</Form>
	);
};