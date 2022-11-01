import clientPromise from '../lib/mongodb'
import Link from 'next/link'

export default function Top({ movies }) {
  return (
    <div>
      <h1>Top 1000 Movies of All Time</h1>
      <p>According to Metacritic</p>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`${movie._id}`}>
              <h2>{movie.title}</h2>
            </Link>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const client = await clientPromise
    const db = client.db('sample_mflix')
    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(1000)
      .toArray()
    return {
      props: {
        movies: JSON.parse(JSON.stringify(movies)),
      },
    }
  } catch (error) {
    console.error(error)
  }
}
