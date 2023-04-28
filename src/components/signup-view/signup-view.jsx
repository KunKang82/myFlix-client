import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday
		};

		fetch("https://myflix-movie-api.herokuapp.com/users", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then((response) => {
			if (response.ok) {
				alert("Signup successful");
				// window.location.replace("/login"); // moves to the login page after signing up
				// login the user after successful registration
				fetch("https://myflix-movie-api.herokuapp.com/login", {
					method: "POST",
					body: JSON.stringify({
						Username:username,
						Password: password
					}),
					headers: {
						"Content-Type": "application/JSON"
					}
				}).then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Login failed");
					}
				}).then((data) => {
					localStorage.setItem("token", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					window.location.reload();
				}).catch((error) => {
					alert(error.message);
				});
			} else {
				alert("Signup failed");
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formUsername">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					minLength="5"
					placeholder="Please create your Username"
					pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
          title="Username should contain more than 5 characters, may only contain letters, numbers and special characters: .,'-!?%&"
				/>
			</Form.Group>

			<Form.Group controlId="formPassword">
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength="3"
					placeholder="Please create your Password"
					pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
          title="Password should contain more than 3 characters, may only contain letters, numbers and special characters: .,'-!?%&"
				/>		
			</Form.Group>

			<Form.Group controlId="formEmail">
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					// required
					placeholder="Please enter your email"
				/>		
			</Form.Group>

			<Form.Group controlId="formBirthday">
				<Form.Label>Birthday:</Form.Label>
				<Form.Control
					type="date"
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					// required
				/>		
			</Form.Group>
			<Button variant="primary" type="submit">Register</Button>			
		</Form>
	);
};