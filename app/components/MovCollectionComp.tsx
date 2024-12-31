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
}

const MovieCollectionComponent = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await pb.collection('movies').getFullList({
          sort: '', // Fetch without sorting since we'll sort in code
        });

        console.log(movies); // Log the raw response to inspect the structure

        const sortedMovies = movies
          .map((item: any) => {
            // Directly access the properties of the item
            if (item.title && item.collection) {
              return {
                id: item.id,
                title: item.title,
                collection: item.collection,
              };
            }
            return null; // Handle cases where title or collection is missing
          })
          .filter((movie) => movie !== null) // Filter out null values
          .sort((a: Movie, b: Movie) => b.collection - a.collection) // Sort by 'collection' descending
          .slice(0, 5); // Take the top 5

        console.log(sortedMovies); // Log the sorted movies
        setTopMovies(sortedMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="TopMov">
      <h1>Top 5 Collected Movies</h1>
      <div className="movie-names">
        {topMovies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <p><strong>{movie.title}</strong> - {movie.collection} cr.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieCollectionComponent;
