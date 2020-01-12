import {useRouter} from "next/router";
import {getMovieById} from "../../actions";

const Movie = (props: any) => {
  const { query } = useRouter();
  console.log(props);

  return (
    <div className="container">
      <h1>Movie with id: { query.id }</h1>
      <h2>{JSON.stringify(props)}</h2>
      <div className="jumbotron">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention
          to featured content or information.</p>
        <hr className="my-4" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </div>
    </div>
  )
};

Movie.getInitialProps = (props: { query: { id: string } }) => {
  // const movie = await getMovieById(props.query.id);
  // return { movie };
  return { aa: '11' };
};

export default Movie;
