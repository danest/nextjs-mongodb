var ObjectId = require('mongodb').ObjectId
import clientPromise from '../lib/mongodb'
import { useRouter } from 'next/router'

const Movie = ({ movie }) => {
  console.log('hello from main component')
  console.log(movie)
  return <p>Movie: {movie.title}</p>
}

export default Movie

export async function getStaticProps({ params: { id } }) {
  try {
    //console.log('params', params)
    const client = await clientPromise
    const db = client.db('sample_mflix')
    const movie = await db
      .collection('movies')
      .find({ _id: ObjectId(id) })
      .limit(1)
      .toArray()

    console.log('searched...')
    console.log(movie)
    return {
      props: {
        movie: JSON.parse(JSON.stringify(movie[0])),
      },
    }
  } catch (error) {
    console.error(error)
  }
}

export async function getStaticPaths() {
  try {
    const client = await clientPromise
    const db = client.db('sample_mflix')
    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(1000)
      .toArray()
    //console.log(movies)
    const paths = movies.map((movie) => ({
      params: {
        id: movie._id.toString(),
      },
    }))
    console.log(paths)
    // [
    //   ({ params: { id: '573a1394f29313caabce0808' } },
    //   { params: { id: '573a1393f29313caabcdbe7c' } },
    //   { params: { id: '573a1395f29313caabce1f51' } },
    //   { params: { id: '573a1395f29313caabce1bd0' } },
    //   { params: { id: '573a1394f29313caabcdf67a' } })
    // ]
    return {
      paths,
      fallback: false,
    }
  } catch (error) {
    console.error(error)
  }
}
