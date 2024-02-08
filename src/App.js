import { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/Layout';
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {

    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);

    const getMovies = async () => {
        try {
            const res = await fetch('https://movies-backend-ctx9.onrender.com/api/v1/movies', {
                method: 'GET',
                headers:{
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const data = await res.json()
            console.log(data)
            setMovies(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getMovieData = async (movieId) => {

        try {
            const res = await fetch(`https://movies-backend-ctx9.onrender.com/api/v1/movies/${movieId}`, {
                method: 'GET',
                headers:{
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const singleMovie = await res.json()
            console.log(singleMovie)
            console.log(singleMovie.reviewIds)
            setMovie(singleMovie);
            setReviews(singleMovie.reviewIds);
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        getMovies()
    }, [])

    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home movies={movies} />}></Route>
                    <Route path='/Trailer/:ytTrailerId' element={<Trailer />}></Route>
                    <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
