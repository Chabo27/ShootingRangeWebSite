import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPersonRifle,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Header = ({ type }) => {
  const [city, setCity] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { city, dates } });
    navigate("/streljane", { state: { city, dates } });
  };

  return (
    <div className={`header ${type === "list" ? "listMode" : ""}`}>
      <div className="headerContainer">
        {type !== "list" && (
          <>
           <div className="headerLogo">
            <h1 className="headerTitle">
              Sjajne Ponude Po Nikad Nižim Cijenama!
            </h1><div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">SK Pogodak</span>
        </Link>
       
      </div>
            </div> 
            
            <p className="headerDescription">
              Isprobaj naše nove aranžmane, i osiguraj sebi nezaboravno iskustvo!
            </p>

            {user ? (
              <div className="navItems">
                <button className="navButton" onClick={handleLogout}>
                  Odjavi se
                </button>
              </div>
            ) : (
              <div className="navItems">
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="navButton">Registracija</button>
                </Link>

                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="navButton">Prijavljivanje</button>
                </Link>
              </div>
            )}

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faPersonRifle}
                  className="headerIcon"
                />
                <input
                  type="text"
                  placeholder="U kojem gradu?"
                  className="headerSearchInput"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerIcon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                    dates[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <button className="searchButton" onClick={handleSearch}>
                  Traži
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
