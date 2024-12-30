import './global.css';
import LatestMoviesComponent from './components/LatestMoviesComp'; // Import the component
import NavBarComponent from './components/NavBarComp';
import MovieCollectionComponent from './components/MovCollectionComp';
import MovieBudgetComponent from './components/MovbudgetComp';
import MovieCollSucComponent from './components/MovSuccComp';

export default function HomePage() {
    return (
        <div>
            <NavBarComponent />
            <h1 className='TrendingMovies'>--Trending Movies--</h1>
            <LatestMoviesComponent />
            <div className="records">
                <MovieCollectionComponent />
                <MovieBudgetComponent />
                <MovieCollSucComponent />
            </div>
        </div>
    );
}
