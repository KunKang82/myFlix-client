import React from "react";

//Import the PropTypes library
import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

// import "./movie-card.scss";

//The MovieCard funciton component
export const MovieCard = ({ movie, user }) => {
	
	return (
		// <Card onClick={() => {onMovieClick(movie);
		// }} className="h-100">
		<Card>
			<Card.Img variant="top" src={movie.image} />
			<Card.Body>
				<Card.Title>Title: {movie.title}</Card.Title>
				<Card.Text>Genre: {movie.genre}</Card.Text>
				<Card.Text>Director: {movie.director}</Card.Text>
				<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
					<Button variant="link">See more</Button>
				</Link>
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
};