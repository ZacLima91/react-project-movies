import {
  useState,
  useEffect,
  useRef,
  IframeHTMLAttributes,
  DetailedHTMLProps,
  LegacyRef,
  RefObject,
  MouseEventHandler,
} from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "../../api/api";
import { Movie } from "../../api/types";
import { OutlineButton } from "../button/Button";

import "./hero-slide.scss";
import { Modal, ModalContent } from "../modal/Modal";

type Props = {
  item: Movie;
  className: string;
};

export const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState<Movie[] | undefined>([]);

  useEffect(() => {
    api
      .getMovies()
      .then((response) => {
        setMovieItems(response);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems?.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = (props: Props) => {
  const background = props.item.imgFullScreen;

  const [openModalTrailer, setOpenModalTrailer] = useState(false);

  const handleClick: MouseEventHandler<HTMLSpanElement> = () => {
    setOpenModalTrailer(!openModalTrailer);
  };
  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{props.item.name}</h2>
          <div className="description">{props.item.description}</div>
          <div className="btns">
            <OutlineButton onClick={handleClick} className="">
              Ver Trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={props.item.imgUrl} alt={props.item.name} />
        </div>
        {openModalTrailer && <TrailerModal className={""} item={props.item} />}
      </div>
    </div>
  );
};

const TrailerModal = (props: Props) => {
  const item = props.item;

  const iframeRef = useRef<any>(null);

  const onClose = () => iframeRef.current?.setAttribute("src", "");
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose} active={false} id={""}>
        <iframe
          width="853"
          height="480"
          src={item.trailer}
          title={item.name}
          allowFullScreen
        ></iframe>
        ,
      </ModalContent>
    </Modal>
  );
};

