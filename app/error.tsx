"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) { return <section className="notFound"><p className="eyebrow gold">SOMETHING INTERRUPTED</p><h1>Please try again.</h1><button className="goldButton" onClick={reset}>Try again</button></section>; }
