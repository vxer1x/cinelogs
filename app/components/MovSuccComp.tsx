"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import './global.css';

const pb = new PocketBase('https://vxer.pockethost.io');
pb.autoCancellation(false);

interface Movie {
  id: string;
  title: string;
  collection: number;
  budget: number;
  successRatio?: number;
}

const MovieCollSucComponent = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await pb.collection('movies').getFullList(); // Fetch all movies

      const sortedMovies = movies
        .map((movie: any) => {
          const successRatio = movie.collection && movie.budget ? movie.collection / movie.budget : 0; // Calculate ratio, avoid division by 0
          return {
            id: movie.id,
            title: movie.title,
            collection: movie.collection,
            budget: movie.budget,
            successRatio: successRatio,
          };
        })
        .sort((a: Movie, b: Movie) => (b.successRatio ?? 0) - (a.successRatio ?? 0)) // Sort by successRatio descending, with fallback to 0
        .slice(0, 5); // Take the top 5

      setTopMovies(sortedMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="TopMov">
      <h1>Top Success% Movies</h1>
      <div className="movie-names">
        {topMovies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <p>
              <strong>{movie.title}</strong> - {(movie.successRatio! * 100).toFixed(2)}%
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieCollSucComponent;
