'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBarComp = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      router.push(`/search/${query}`);
    }
  };

  return (
    <input
      type="text"
      className="SearchBar"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBarComp;
