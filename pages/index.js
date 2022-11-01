import Head from 'next/head'
import clientPromise from '../lib/mongodb'

export default function Home({ isConnected }) {
  console.log(isConnected)
  console.log('helo')
  return (
    <div>
      <h1>Kevins Mongo Test</h1>
      {isConnected && <p>Connected</p>}
      {!isConnected && <p>Error Connecting</p>}
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        isConnected: false,
      },
    }
  }
}
