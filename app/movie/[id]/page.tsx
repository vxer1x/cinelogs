import PocketBase from 'pocketbase';
import './global.css'

import NavBarComponent from '@/app/components/NavBarComp';

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

const MoviePage = async ({ params }: MoviePageProps) => {
  // Unwrap the params Promise
  const { id } = await params;

  const pb = new PocketBase('https://vxer.pockethost.io'); // Replace with your PocketBase URL

  try {
    const movie = await pb.collection('movies').getOne(id);

    return (
      <div>
        <div id="container-43a840255258a1fd2fd22af5493a9b84"></div>
        <NavBarComponent />
        
        <h1>{movie.title}</h1>
        <div className="container">
          <img src={movie.posterurl} alt="poster"/>
          <div className="movie-details">
            <p><strong>Release Date: </strong>{movie.sreleasedate}</p>
            <p><strong>Age Rating: </strong>{movie.agerating}</p>
            <p><strong>Genre: </strong>{movie.genre}</p>
            <p><strong>Runtime: </strong>{movie.runtime}</p>
            <p><strong>Rating: </strong>{movie.rating}</p>
            <p><strong>Budget: </strong>{movie.budget}</p>
            <p><strong>Collection: </strong>{movie.collection}</p>
          </div>
        </div>
        <div id="container-43a840255258a1fd2fd22af5493a9b84"></div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie:', error);

    return <div>Movie not found</div>;
  }
};

export default MoviePage;
