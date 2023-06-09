import React, { useState } from "react";
import { Form, Button, Card, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({ movies, user, token, updateUser, }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://myflix-movie-api.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Error!");
        return false;
      }
    }).then(user => {
      if (user) {
        alert("Successfully changed userdata");
        updateUser(user);
      }
    }).catch(e => {
      alert("Update failed");
    });
  }

  const deleteAccount = () => {
    fetch(`https://myflix-movie-api.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      if (response.ok) {
        alert("You account has been deleted");
        localStorage.clear();
        window.location.reload("/login"); // moves to the login page automatically after the account is deleted
      } else {
        alert("Your account could not be deleted")
      }
    });
  }

  return (
    <>
      <Col md={20}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title >Your information</Card.Title>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {user.Birthday}</p>
          </Card.Body>
        </Card>
        <Button variant="danger" onClick={() => {
          if (confirm("Are you sure?")) {
            deleteAccount();
          }
        }}>Delete your account</Button>
      </Col>
      <Col md={20}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Update your information</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  minLength="5"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength="4"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12}>
        <h3 className="mt-3 mb-3 text-dark">Your favorite movies:</h3>
      </Col>
      {favoriteMovies.map(movie => (
        <Col className="mb-4" key={movie.id} xl={6} lg={3} md={4} xs={6}>
          <MovieCard movie={movie} />
        </Col>        
      ))}
    </>
  );
}