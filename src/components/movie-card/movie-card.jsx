//Import the PropTypes library
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

// import "./movie-card.scss";

//The MovieCard funciton component
export const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<Card onClick={() => {onMovieClick(movie);
		}} className="h-100">
			<Card.Img variant="top" src={movie.image} />
			<Card.Body>
				<Card.Title>Title: {movie.title}</Card.Title>
				<Card.Text>Genre: {movie.genre}</Card.Text>
				<Card.Text>Director: {movie.director}</Card.Text>
				{/* <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button> */}
				<Button variant="link">Open</Button>
			</Card.Body>
		</Card>
	);
};

//Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
	movie: PropTypes.shape({
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
	onMovieClick: PropTypes.func.isRequired
}