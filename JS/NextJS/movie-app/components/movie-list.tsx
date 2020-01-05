import React from "react";
import Movie from "./movie";

class MovieList extends React.Component<any, any> {
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return <>
      { this.props.movies.map((movie: any) => Movie(movie)) }
    </>
  }
}

export default MovieList;
