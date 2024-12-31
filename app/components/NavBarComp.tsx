import Link from 'next/link';
import './global.css'

import SearchBar from './SearchBarComp';


async function NavBarComponent() {
    return (
        <div className="NavBar">
            <Link href={'/'}>
            <h1 className="Logotitle">🍿vxer.info</h1>
            </Link>
            
            <SearchBar/>
        </div>
    );
}

export default NavBarComponent;