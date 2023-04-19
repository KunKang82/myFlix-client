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

// Organize component with Row
import Row from "react-bootstrap/Row";

// Organize component with Col
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-movie-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
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
      <Row className="justify-content-md-center"> 
        {!user ? (
          <Col md={5}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user)
              setToken(token)
            }} />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={6} style={{ border: "1px solid black" }}>
            <MovieView 
              style={{ border: "1px solid green" }}
              movie={selectedMovie} 
              onBackClick={() => setSelectedMovie(null)} 
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            <Row>
              <Col md={3}>
                <Button onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}>Logout</Button>
              </Col>
            </Row>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                  />
              </Col>
            ))}
          </>
        )}
      </Row>
  );

  // useEffect(() => {
  //   if (!token) return;

  //   fetch("https://myflix-movie-api.herokuapp.com/movies", {
  //     headers: { Authorization: `Bearer ${token}`}
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const moviesFromApi = data.map((movie) => {
  //         return {
  //           id: movie._id,
  //           title: movie.Title,
  //           description: movie.Description,
  //           image: movie.ImageUrl,
  //           genre: movie.Genre.Name,
  //           director: movie.Director.Name
  //         };
  //       });
  //       setMovies(moviesFromApi);
  //     })
  //     .catch((error) => console.log(error));
  // }, [token]);

  // if (!user) {
  //   return (
  //     <>
  //       <LoginView onLoggedIn={(user, token) => {
  //         setUser(user);
  //         setToken(token);
  //       }} />
  //       or
  //       <SignupView />
  //     </>
  //   );
  // }

  // // Displays movie-view when movie is selected (clicked)
  // if (selectedMovie) {
  //   return (
  //     <>
  //       <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //       <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  //     </>
  //   );
  // }

  // // Displays text message if list of movies is empty
  // if (movies.length === 0) {
  //   return (
  //     <>
  //       <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //       <div>The list is empty!</div>
  //     </>
  //   );
  // }

  // // Displays movie-card with logout button, if user does not select a movie
  // return (
  //   <div>
  //     <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //     {movies.map((movie) => (
  //       <MovieCard
  //         key={movie.id}
  //         movie={movie}
  //         onMovieClick={(newSelectedMovie) => {
  //           setSelectedMovie(newSelectedMovie);
  //         }}
  //       />
  //     ))}
  //   </div>
  // );
}

