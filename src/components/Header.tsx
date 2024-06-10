import Logo from '@/assets/logo.png'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="p-4">
            <Link to={'/'} className="flex items-center gap-2">
                <img
                    src={Logo}
                    alt="Wealth Health logo"
                    width={40}
                    height={40}
                />
                <span className="text-xl font-bold">
                    HRnet{' '}
                    <small className="font-normal text-slate-500">
                        by Wealth Health
                    </small>
                </span>
            </Link>
        </header>
    )
}

export default Header
