import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./book.css";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"; // Updated icon import
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react"; // Added useEffect
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Book = ({ setOpen, streljanaId }) => {
  const [selectedPonude, setSelectedPonude] = useState([]);
  const { data, loading, error } = useFetch(`/streljane/ponuda/${streljanaId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (brojPonude) => {
    const isFound = brojPonude.nedostupniDatumi.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedPonude(
      checked
        ? [...selectedPonude, value]
        : selectedPonude.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
    //   const username = 'marko'; 
    //   const password = '$2a$10$NPJagSnOAnktul5J08EucOQuUXvxG7Ptao1RCftJmq3PDEw9kB0AO'; 
  
    //   const authHeader = {
    //     username,
    //     password,
    //   };
  
      await Promise.all(
        selectedPonude.map((ponudaId) => {
          const res =  axios.put(`/ponude/dostupnost/${ponudaId}`, {
            dates: alldates,
          }, 
          // {
          //   auth: authHeader,
          // }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Error updating Ponuda dates:", err);
    }
  };
  
  

  return (
    <div className="book">
      <div className="bContainer">
      <FontAwesomeIcon
  icon={faTimesCircle} // Updated icon name
  className="bClose"
  onClick={() => setOpen(false)}
/>
        <span>Selektujte izabrane ponude:</span>
        {data.map((item) => (
          <div className="bItem" key={item._id}>
            <div className="bItemInfo">
              <div className="bTitle">{item.naziv}</div>
              <div className="bDes">{item.opis}</div>
              <div className="bPrice">{item.cijena}</div>
            </div>
            <div className="bSelectPonude">
            {item.brojPonuda.map((brojPonude) => (
              <div className="ponuda">
                <label>{brojPonude.broj}</label>
                <input
                  type="checkbox"
                  value={brojPonude._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(brojPonude)}
                />
              </div>
               ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="bButton">
          Rezerviši sada!
        </button>
      </div>
    </div>
  );
};

export default Book;
