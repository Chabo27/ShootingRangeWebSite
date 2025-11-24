import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.slike[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.ime}</h1>
        <span className="siDistance">{item.udaljenost}km od centra</span>
        {/* <span className="siTransport">Linija 44 gradskog prevoza</span> */}
        <span className="siSubtitle">
            Opšta streljana sa atraktivnim streljačkim poligonom!
        </span>
        <span className="siFeatures">
            {item.opis}
           </span>
           <span className="siCancepOp">Besplatno otkazivanje</span>
           <span className="siCancelOpSubtitle">
            Kasnije možeš otkazati, tako da rezerviši termin odmah!
           </span>
      </div>
      <div className="siDetails">
        {item.ocjena && <div className="siRating">
            <span>Odlična</span>
            <button>{item.ocjena}</button>

        </div>}
        <div className="siDetailTexts">
            <span className="siPrice">€{item.najjeftinijaPonuda}</span>
            <span className="siAmmo">Uključuje porez, i određeni broj municije</span>
            <Link to={`/streljane/${item._id}`}>
            <button className="siCheckButton">Pogledaj dostupnost</button>
            </Link>
        </div>
      </div>
    </div>
  );
};
export default SearchItem;
