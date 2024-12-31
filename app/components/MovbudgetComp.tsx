"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import './global.css';

const pb = new PocketBase('https://vxer.pockethost.io');
pb.autoCancellation(false);

// Adjust the Movie interface based on the actual data structure
interface Movie {
  id: string;
  title: string;
  budget: number;
}

const MovieBudgetComponent = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await pb.collection('movies').getFullList({
          sort: '', // Fetch without sorting since we'll sort in code
        });

        // Map the data to Movie type
        const sortedMovies = movies
          .map((item: any) => {
            // Ensure item has title and budget
            if (item.title && item.budget) {
              return {
                id: item.id,
                title: item.title,
                budget: item.budget,
              };
            }
            return null; // Handle cases where title or budget is missing
          })
          .filter((movie) => movie !== null) // Filter out null values
          .sort((a: Movie, b: Movie) => b.budget - a.budget) // Sort by 'budget' descending
          .slice(0, 5); // Take the top 5

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
      <h1>Top 5 Budget Movies</h1>
      <div className="movie-names">
        {topMovies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <p><strong>{movie.title}</strong> - {movie.budget} cr.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieBudgetComponent;
