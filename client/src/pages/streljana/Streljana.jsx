import "./streljana.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Book from "../../components/book/Book";
const Streljana = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openBook, setOpenBook] = useState(false);

  const { data, loading, error } = useFetch(`/streljane/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dailyDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dailyDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenBook(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      
      {loading ? (
        "Učitavanje "
      ) : (
        <div className="streljanaContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.slike[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="streljanaWrapper">
            
            <h1 className="streljanaTitle">{data.ime}</h1>
            <div className="streljanaAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span> {data.adresa}</span>
            </div>
            <span className="streljanaDistance">
              Odlična lokacija - {data.udaljenost} km od centra grada
            </span>
            <span className="streljanaPriceHighlight">
              Zakaži termin u ovoj streljani već od €{data.najjeftinijaPonuda} i
              dobijaš 10 dodatnih metaka za oružje koje izabereš!
            </span>
            <div className="streljanaImages">
              {data.slike?.map((photo, i) => (
                <div className="streljanaImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="streljanaImg"
                  />
                </div>
              ))}
            </div>
            <div className="streljanaDetails">
              <div className="streljanaDetailsTexts">
                <h1 className="streljanaTitle">{data.naslov}</h1>
                <p className="streljanaDesc">{data.opis}</p>
              </div>
              <div className="streljanaDetailsPrice">
                <h1>Perfektna za početnike, ali i napredne</h1>
                <span>
                  Locirana u blizini gradskog jezgra Podgorice, ova streljana
                  ima odličan rejting 9.7!
                </span>
                <h2>
                  
                  <b>€{days * data.najjeftinijaPonuda}</b> (
                  uključene sve vrste naoružanja)
                </h2>
                <button onClick={handleClick}>Rezerviši sada!</button>
              </div>
            </div>
          </div>
          <Footer />
          
        </div>
      )}
      {openBook && <Book setOpen={setOpenBook} streljanaId={id}/>}
    </div>
  );
};
export default Streljana;
