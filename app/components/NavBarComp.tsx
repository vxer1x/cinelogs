import Link from 'next/link';
import './global.css'


async function NavBarComponent() {
    return (
        <div className="NavBar">
            <Link href={'/'}><h1 className="Logo">CineLogs.</h1></Link>
            
            <input type="text" className="SearchBar" placeholder="Search..."/>
        </div>
    );
}

export default NavBarComponent;