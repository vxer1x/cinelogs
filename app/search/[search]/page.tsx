import PocketBase from 'pocketbase';
import './global.css';

import NavBarComponent from '@/app/components/NavBarComp';
import Link from 'next/link';

interface SearchPageProps {
  params: Promise<{ search: string }>;
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const { search } = await params;
  const pb = new PocketBase('https://vxer.pockethost.io'); // Replace with your PocketBase URL
  const searchQuery = search;

  try {
    // Fetch movies matching the search query
    const movies = await pb.collection('movies').getList(1, 50, {
      filter: `title ~ "${searchQuery}"`, // Partial match for the search query
    });

    // If no results are found, display a message
    if (movies.items.length === 0) {
      return (
        <div>
            <NavBarComponent />
          <h1>No results found for: {searchQuery}</h1>
        </div>
      );
    }

    return (
      <div>
        <NavBarComponent />
        <h1 className='SearchResults'>Search Results for: {searchQuery}</h1>
        <div className='SearchMovieCards'>
          {movies.items.map((movie: any) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="SearchMovieCard">
                    <img src={movie.posterurl} alt="poster missing" />
                    <div className="SearchMovieDetails">
                        <h1 key={movie.id} className='MovieTitle'>{movie.title}</h1>
                        <h1>Rating: {movie.rating}</h1>
                        <h1>Release Date: {movie.sreleasedate}</h1>
                        <h1>Age Rating: {movie.agerating}</h1>
                    </div>  
                </div>
            </Link>
          ))}
        </div>
        <div id="container-43a840255258a1fd2fd22af5493a9b84"></div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);

    return (
        <div>
            <NavBarComponent />
            <h1>Error</h1>
            <p>Something went wrong while processing your request.</p>
        </div>
    );
  }
};

export default SearchPage;
