import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./Details.scss";
import CastList from "./CastList";
import VideosList from "./VideosList";
import MovieList from "../../coponents/movieList/MovieList";
const Details = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [isCreatedChild, setIsCreatedChild] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0); // what is this for? => scroll to top of the page
    };
    getDetails();
  }, [category, id]);
  console.log(item);
  const handleCreatedChild = () => {
    setIsCreatedChild(true);
  };

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="nb-3 section videos">
              {isCreatedChild ? (
                <div className="section__videos__header">
                  <h1>Videos</h1>
                </div>
              ) : null}
              <VideosList id={item.id} onCreated={handleCreatedChild} />
            </div>

            <div className="section mb-3">
              <div className="section__videos__header mb-2">
                {isCreatedChild ? <h2>Similar</h2> : null}
              </div>
              <MovieList
                category={category}
                type="similar"
                id={item.id}
                onCreated={handleCreatedChild}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
