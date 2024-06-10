import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="grid h-full place-content-center gap-4 text-center">
            <h1 className="text-8xl font-extrabold tracking-tight lg:text-9xl">
                404
            </h1>
            <p className="text-xl text-slate-700">
                Sorry, we are unable to find the resource you are looking for.
            </p>
            <Link to={'/'}>Back to employees</Link>
        </section>
    )
}
