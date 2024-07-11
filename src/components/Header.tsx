import { Link } from 'react-router-dom'
import { Logo } from './ui/logo'

/**
 * Renders the header component.
 * @returns The rendered header component.
 */
function Header() {
    return (
        <nav className="flex items-center justify-between bg-white p-4 shadow">
            <Link to={'/'} className="flex items-center gap-2">
                <Logo />
            </Link>
        </nav>
    )
}

export default Header
