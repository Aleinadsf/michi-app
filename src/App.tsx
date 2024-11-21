import { FC } from 'react'
import './App.css'
import MarvelFetch from './pages/marvelFetch'
import PokeFetch from './pages/pokeFetch'
import AxiosPage from './pages/axiosPage'
import AlovaPage from './pages/alovaPage'

const App: FC = () => {

  return (
    <>
      <h2 className='titulo'>
        Fetch API en React
      </h2>
      <PokeFetch />
      <MarvelFetch />
      <h2 className='titulo'>Axios</h2>
      <AxiosPage />
      <h2 className='titulo'>Alova</h2>
      <AlovaPage/>

    </>
  )
}

export default App
