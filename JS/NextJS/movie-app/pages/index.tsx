import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Navbar from "../components/navbar";
import SideMenu from "../components/side-menu";
import Carousel from "../components/carousel";
import MovieList from "../components/movie-list";
import Footer from "../components/footer";
import {getMovies, MOVIE_DATA, MovieType} from "../resources/movie-data";

const Home = (props: any) => {
  // 여기 코드는 처음에 Server Side Rendering을 할 때 실행이 되고,
  // 브라우저에 렌더된 후에도 다시 실행된다
  console.log('-----------------');
  console.log(props);
  console.log('-----------------');

  const [ movies, setMovies ] = useState<MovieType[]>([]);
  const [ count, setCount ] = useState<number>(0);

  useEffect(() => {
    // typescript 사용 시 async는 지원하지 않는다 그래서 아래와 같은 trick을 쓴다
    const fetchMovies = async () => {
      const movies = await getMovies();
      setMovies(movies);
    };

    fetchMovies();
  }, [count]); // count state가 바뀔 때 마다 useEffect의 첫번째 인자 함수가 실행된다

  return (
    <div>

      <div className="home-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SideMenu/>
            </div>

            <div className="col-lg-9">
              <Carousel/>

              <button className="btn btn-warning" onClick={() => setCount(count + 1)}>Load movie</button>

              <div className="row">
                <MovieList movies={movies}/>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
)};

// Get props from server
Home.getInitialProps = async () => {
  const movies = await getMovies();
  console.log('log from server!');

  // 전부 다 처리된 후에 이 props로 dom을 그린 뒤에
  // 브라우저에 렌더링된다.
  return { movies }
};

export default Home
