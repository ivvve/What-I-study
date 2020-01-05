import React from "react";

const Movie = (movie: Readonly<{
    id: string, name: string, releaseYear: number,
    description: string, rating: number, genre: string, image: string
}>) => {
  const {id, name, releaseYear, description, rating, genre, image} = movie;

  return (
    <div key={id} className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100">
        <a href="#"><img className="card-img-top" src={image} alt=""/></a>
        <div className="card-body">
          <h4 className="card-title">
            <a href="#">{name}</a>
          </h4>
          <p className="card-text">{shorten(description)}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">{rating}</small>
        </div>
      </div>
    </div>
  )
};

function shorten(text: string): string {
  if (100 < text.length) {
    return text.substr(0, 100) + '...';
  }

  return text;
}

export default Movie;

