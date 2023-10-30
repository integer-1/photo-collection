import { useQuery } from '@tanstack/react-query'
import PhotoList from './Photo'
import { getAllPhoto } from '../apis/photo'

function App() {
  const { data: photos, isLoading, isError } = useQuery(['photos'], getAllPhoto)

  if (isError) {
    return (
      <>
        <p>Something went wrong!</p>
      </>
    )
  }

  if (!photos || isLoading) {
    return <p>...loading</p>
  }

  return (
    <>
      <header className="header">
        <h1>My Photo Collection</h1>
      </header>
      <section className="main">
        <PhotoList list={photos}/>
      </section>
    </>
  )
}

export default App
