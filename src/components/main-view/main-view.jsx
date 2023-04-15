// Importing useState for creation and Initialization
import { useState, useEffect } from "react";

// Importing MovieCard compnent
import { MovieCard } from "../movie-card/movie-card";

// Importing Moview component
import { MovieView } from "../movie-view/movie-view";

// Importing LoginView component
import { LoginView } from "../login-view/login-view";

// Importing SignupView component
import { SingupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("toekn");

  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);



  // useEffect(() => {
  //   fetch("https://myflix-movie-api.herokuapp.com/movies")
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
  // }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://myflixmoviedb.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SingupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}

