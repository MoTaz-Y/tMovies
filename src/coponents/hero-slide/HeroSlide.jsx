import "./hero-slide.scss";
import PropTypes from "prop-types";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import Button, { OutlineButton } from "../button/Button";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        console.log(response);
        setMovieItems(response.results.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem item={item} className={isActive ? "active" : ""} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useHistory();

  const item = props.item;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push(`/movie/${item.id}`)}>
              Watch Now
            </Button>
            <OutlineButton
              onClick={() => {
                console.log("trailer");
              }}
            >
              <i className="bx bx-plus"></i>
              <span>Watch trailer</span>
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

HeroSlideItem.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
};

export default HeroSlide;
