"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import './global.css';

const pb = new PocketBase('https://vxer.pockethost.io');
pb.autoCancellation(false);

interface Movie {
  id: string;
  expand: {
    movie: {
      id: string;
      posterurl: string;
    };
  };
}

interface RecordModel {
  id: string;
  expand?: {
    movie?: {
      id: string;
      posterurl: string;
    };
  };
}

const LatestMoviesComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await pb.collection('trendingmovies').getList(1, 50, {
        expand: 'movie',
      });

      const movieData = response.items.map((item: RecordModel) => ({
        id: item.id,
        expand: {
          movie: item.expand?.movie || { id: '', posterurl: '' }, // Fallback to empty object if movie is undefined
        },
      }));

      setMovies(movieData);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="LatestMoviescomp">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.expand.movie.id}`}>
          <div className="poster">
            <img src={movie.expand.movie.posterurl} alt="Poster missing" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LatestMoviesComponent;
