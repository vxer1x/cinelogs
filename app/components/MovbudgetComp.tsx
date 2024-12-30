import Link from 'next/link';
import PocketBase from 'pocketbase';
import './global.css'

const pb = new PocketBase('https://vxer.pockethost.io');


async function MovieBudgetComponent() {
    const movies = await pb.collection('movies').getFullList({
        sort: '', // Fetch without sorting since we'll sort in code
    });
    const topMovies = movies
        .sort((a: any, b: any) => b.budget - a.budget) // Sort by 'collection' descending
        .slice(0, 5); // Take the top 5

    return (
        <div className="TopMov">
            <h1>Top 5 Budget Movies</h1>
            <div className="movie-names">
                {topMovies.map((movie: any) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`}>
                        <p><strong>{movie.title}</strong> - {movie.budget} cr.</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MovieBudgetComponent;