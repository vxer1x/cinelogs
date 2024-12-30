import Link from 'next/link';
import PocketBase from 'pocketbase';
import './global.css'

const pb = new PocketBase('https://vxer.pockethost.io');


async function MovieCollectionComponent() {
    const movies = await pb.collection('movies').getFullList({
        sort: '', // Fetch without sorting since we'll sort in code
    });
    const topMovies = movies
        .sort((a: any, b: any) => b.collection - a.collection) // Sort by 'collection' descending
        .slice(0, 5); // Take the top 5

    return (
        <div className="TopMov">
            <h1>Top 5 collected Movies</h1>
            <div className="movie-names">
                {topMovies.map((movie: any) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`}>
                        <p><strong>{movie.title}</strong> - {movie.collection} cr.</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MovieCollectionComponent;