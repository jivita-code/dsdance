import Link from "next/link";
export default function NotFound() { return <section className="notFound"><p className="eyebrow gold">404</p><h1>Page not found</h1><p>The page you were looking for is not available.</p><Link className="goldButton" href="/">Return home</Link></section>; }
