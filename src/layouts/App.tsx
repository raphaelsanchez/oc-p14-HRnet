import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useEmployeesStore } from '@/store/useEmployeesStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * The main component of the application.
 * Renders the header, outlet, and footer components.
 */
export default function App() {
    const { fetchEmployees } = useEmployeesStore()

    //. Fetch employees on mount to populate the store.
    useEffect(() => {
        fetchEmployees()
    }, [fetchEmployees])

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
