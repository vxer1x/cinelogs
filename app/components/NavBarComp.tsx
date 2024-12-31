import Link from 'next/link';
import './global.css'


async function NavBarComponent() {
    return (
        <div className="NavBar">
            <Link href={'/'}>
            <h1 className="Logotitle">CineLogs.</h1>
            <img src="/popcorn.png" alt="popcorn"/>
            </Link>
            
            <input type="text" className="SearchBar" placeholder="Search..."/>
        </div>
    );
}

export default NavBarComponent;