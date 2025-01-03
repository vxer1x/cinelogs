// next-sitemap.js
const PocketBase = require('pocketbase'); // Import PocketBase client

const pb = new PocketBase('https://your-pocketbase-host.pockethost.io'); // Replace with your PocketBase URL

module.exports = {
  siteUrl: 'https://vxer.info', // Your site URL
  generateRobotsTxt: true, // Optionally generate robots.txt
  sitemapSize: 7000, // Optional: Max number of URLs per sitemap file
  changefreq: 'daily', // Optional: Frequency of updates
  priority: 0.7, // Optional: Default priority for pages
  transform: async (config, path) => {
    // If you have dynamic routes like /movie/[id], you need to add logic to handle them
    if (path.startsWith('/movie/')) {
      const movieId = path.split('/')[2]; // Extract the movie ID
      // Fetch movie data from PocketBase
      const movieData = await fetchMovieData(movieId); // Fetch movie data from PocketBase
      return {
        loc: path, // Use the path as the URL
        lastmod: movieData.updated, // Optional: Last modified date
        priority: 0.8, // Optional: Priority for the movie pages
      };
    }
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    };
  },
}

// Function to fetch movie data from PocketBase
async function fetchMovieData(movieId) {
  try {
    const movieRecord = await pb.collection('movies').getOne(movieId); // Replace 'movies' with your collection name
    return {
      updated: movieRecord.updated, // Use the updated timestamp or other metadata
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return { updated: new Date().toISOString() }; // Default to current date if there is an error
  }
}
