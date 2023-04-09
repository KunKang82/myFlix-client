//Import the PropTypes library
import PropTypes from "prop-types";

//The MovieCard funciton component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};

//Here is where we define allt he props constraints for the MovieCard
MovieCard.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string,
        }),
        genre: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
}