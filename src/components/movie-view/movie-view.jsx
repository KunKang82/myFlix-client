import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();

	const movie = movies.find((b) => b.id === movieId);

	return (
		<div>
			<div>
				<img className="w-100" src={movie.image} alt={`Movie poster image for ${movie.title}`} />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{movie.description}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.genre}</span>
			</div>
			<div>
				<span>Director: </span>
				<span>{movie.director}</span>
			</div>
			<Link to={'/'}>
				<button className="back-button" style={{ cursor: "pointer"}}>Back</button>
			</Link>
		</div>
	);
};