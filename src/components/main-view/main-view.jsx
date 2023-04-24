// Importing useState for creation and Initialization
import { useState, useEffect } from "react";

// Importing MovieCard compnent
import { MovieCard } from "../movie-card/movie-card";

// Importing Moview component
import { MovieView } from "../movie-view/movie-view";

// Importing LoginView component
import { LoginView } from "../login-view/login-view";

// Importing SignupView component
import { SignupView } from "../signup-view/signup-view";

// Importing ProfileView component
import { ProfileView } from "../profile-view/profile-view";

// Importing NavigationBar component
import { NavigationBar } from "../navigation-bar/navigation-bar";

// Organize component with Row
import Row from "react-bootstrap/Row";

// Organize component with Col
import Col from "react-bootstrap/Col";

// import Button from "react-bootstrap/Button";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedPassword = JSON.parse(localStorage.getItem("password"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [password, setPassword] = useState(storedPassword ? storedPassword : null);

  const [movies, setMovies] = useState([]);
 
  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-movie-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImageUrl,
            genre: movie.Genre.Name,
            director: movie.Director.Name
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => console.log(error));
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          setPassword(null);
          localStorage.clear();
        }}
      />

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/singup"
            element={
              <>
                {user ? (
                  <Navigate to="/" /> // if user is validated, redirects to homepage
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" /> // if user is validated, redirects to homepage
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token, password) => {
                      setUser(user);
                      setToken(token);
                      setPassword(password);
                      localStorage.clear();
                    }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <ProfileView user={user} token={token} password = {password} movies={movies} onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      setPassword(null);
                      localStorage.clear();
                    }} updateUser={updateUser} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace /> // if user is not validated, redirects to login page
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} password={password} updateUser={updateUser} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (


                  <Navigate to="/login" replace /> // if user is not validated, redirects to homepage
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};