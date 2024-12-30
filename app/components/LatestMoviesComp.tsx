import Link from 'next/link';
import PocketBase from 'pocketbase';
import './global.css';

// Initialize PocketBase
const pb = new PocketBase('https://vxer.pockethost.io');

// Component to fetch and display the latest movies
async function LatestMoviesComponent() {
    // Fetch movies with related `movie` data expanded
    const movies = await pb.collection('trendingmovies').getList(1, 50, {
        expand: 'movie', // Expand the related `movie` field
    });

    return (
        <div className="LatestMoviescomp">
            {movies.items.map((movie: any) => (
                <Link key={movie.id} href={`/movie/${movie.expand.movie.id}`}>
                    <div className="poster">
                        <img src={movie.expand.movie.posterurl} alt="Poster missing" />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default LatestMoviesComponent;
