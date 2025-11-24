import  "./list.css";

import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  // safe defaults in case page is opened directly (no location.state)
  const initCity = location.state?.city || "";
  const initDates =
    location.state?.dates || [
      { startDate: new Date(), endDate: new Date(), key: "selection" },
    ];
  const [city, setCity] = useState(initCity);
  const [dates, setDates] = useState(initDates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || {});
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, reFetch } = useFetch(`/streljane?grad=${city}&min=${min-1 || 0}&max=${max+1 || 999}`);

  const handleClick = ()=>{
    reFetch()
  }
  return (
    <div>
      <Navbar />
      
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Grad</label>
              <input
                placeholder="U kojem gradu?"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Datum</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Opcije</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Minimalna cijena</span>
                  <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Maksimalna cijena</span>
                  <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
                </div>
                
              </div>
            </div>
            <button onClick={handleClick}>Traži</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Učitavanje"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
