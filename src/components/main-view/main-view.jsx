// Importing useState for creation and Initialization
import { useState, useEffect } from "react";

// Importing MovieCard compnent
import { MovieCard } from "../movie-card/movie-card";

// Importing Moview component
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://openlibrary.org/search.json?q=star+wars")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.Title,
                        description: doc.Description,
                        image: doc.ImgUrl,
                        genre: doc.Genre.Name,
                        director: doc.Director.Name
                    };
                });
    
                setBooks(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />            
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>
    }

    return (
        <div>
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