import Head from 'next/head'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

import styles from '../styles/Home.module.css'

export default function Home({list}) {

  const [searchText, setSearchText] = useState('')
  const [movieList, setMovieList] = useState([])

  const handleOnKeyDown = (e) => {
    if (e.key === 13 || e.key === 'Enter') {
      handleSearch()
    }
  } 

  const handleSearch = async () => {
    if (searchText !== '') {
      const response = await fetch(`http://localhost:3000/api/search?q=${searchText}`)
      const json = await response.json()
      console.log(json)
      setMovieList(json.list)
      setSearchText('')
    }
  }

  const setVoteColor = (vote) => {
    if (vote >= 8) {
      return "green"
    } else if (vote >= 6){
      return "orange"
    } else {
      return "red"
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Busca</h1>
        <div className={styles.input_container}>
          <input type="text" value={searchText} onChange={e=>setSearchText(e.target.value)} placeholder="Digite o nome do filme..." onKeyDown={handleOnKeyDown} maxLength="50"
          minLength="2"/>
          <button onClick={handleSearch}><FaSearch/></button>
        </div>

        <div className={styles.movie_container}>
          {movieList.map(item=>(
              <div className={styles.movie}>
                <a href={`/movie/${item.id}`}>
                  <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} width="150" alt="img"/> <br/>
                  <div className={styles.movie_info}>
                    <h3>{item.title}</h3> <span style={{color: `${setVoteColor(item.vote_average)}`}}>{item.vote_average}</span>
                  </div>
                </a>
              </div>
          ))}
        </div>
      </main>
        <footer className={styles.footer}>
          Feito com ?????? por Bruno Coutinho.<br />
          Dados por The Movie Database.
        </footer>
    </div>
  )
}