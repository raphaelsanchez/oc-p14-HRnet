import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function App() {
    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
