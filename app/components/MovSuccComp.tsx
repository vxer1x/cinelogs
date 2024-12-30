import Link from 'next/link';
import PocketBase from 'pocketbase';
import './global.css';

const pb = new PocketBase('https://vxer.pockethost.io');

async function MovieCollSucComponent() {
    const movies = await pb.collection('movies').getFullList(); // Fetch all movies

    // Calculate collection/budget ratio and sort by it
    const topMovies = movies
        .map((movie: any) => ({
            ...movie,
            successRatio: movie.collection / movie.budget || 0, // Calculate ratio, avoid division by 0
        }))
        .sort((a: any, b: any) => b.successRatio - a.successRatio) // Sort by ratio descending
        .slice(0, 5); // Take the top 5

    return (
        <div className="TopMov">
            <h1>Top Success% Movies</h1>
            <div className="movie-names">
                {topMovies.map((movie: any) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`}>
                        <p>
                            <strong>{movie.title}</strong> - {movie.successRatio.toFixed(2)*100}%
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MovieCollSucComponent;
