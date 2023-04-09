import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            Title: "Avatar: The Way of Water",
            Description: "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora. When an ancient threat resurfaces, Jake must fight a difficult war against the humans.",
            Year: "2022",
            Genre: {
                Name: "Science fiction",
                Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, interstellar travel, time travel, or other technologies."
            },
            Director: {
                Name: "James Cameron",
                Bio: "James Cameron, (born August 16, 1954, Kapuskasing, Ontario, Canada), Canadian filmmaker known for his expansive vision and innovative special-effects films, most notably Titanic (1997), for which he won an Academy Award for best director, and Avatar (2009).",
                Birthyear: "1954",
                Deathyear: "Present"
            },
            ImageUrl: "https://www.imdb.com/title/tt1630029/mediaviewer/rm92486145/?ref_=tt_ov_i",
            Featured: "yes"
        },
        {
            id: 2,
            Title: "The Matrix Revolutions",
            Description: "In a dystopia overrun by robots, Neo (Keanu Reeves), mankind's greatest hope, is trapped in a limbo world. Meanwhile, the majority of the planet's population remains in a state of suspended virtual reality. The few humans who are cognizant of the grim realities of the world desperately try to hold off their mechanical enemies long enough for Neo to escape and save the day, but things turn disastrous when all-powerful computer program Agent Smith (Hugo Weaving) arrives in the flesh.",
            Year: "2003",
            Genre: {
                Name: "Science fiction",
                Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, interstellar travel, time travel, or other technologies."
            },
            Director: {
                Name: "Lana Wachowski, Lilly Wachoswki",
                Bio: "Lana Wachowski (born June 21, 1965, formerly known as Larry Wachowski)[1] and Lilly Wachowski (born December 29, 1967, formerly known as Andy Wachowski)[2] are American film and television directors, writers and producers",
                Birthyear: "1965",
                Deathyear: "Present"
            },
            ImageUrl: "https://www.imdb.com/title/tt0242653/mediaviewer/rm1810127616/?ref_=tt_ov_i",
            Featured: "yes"
        },
        {
            id: 3,
            Title: "Avengers: Endgame",
            Description: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.",
            Year: "2019",
            Genre: {
                Name: "Superhero",
                Description: "A superhero film (or superhero movie) is a film that focuses on the actions of superheroes. Superheroes are individuals who possess superhuman abilities and are dedicated to protecting the public. These films typically feature action, adventure, fantasy, or science fiction elements."
            },
            Director: {
                Name: "Anthony Russo, Joe Russo",
                Bio: "Anthony Russo (born February 3, 1970) and Joseph Russo (born July 18, 1971), collectively known as the Russo brothers (ROO-so), are American directors, producers, and screenwriters. They direct most of their work together.",
                Birthyear: "1970, 1971",
                Deathyear: "Present"
            },
            ImageUrl: "https://www.imdb.com/title/tt4154796/mediaviewer/rm2775147008/?ref_=tt_ov_i",
            Featured: "yes"
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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