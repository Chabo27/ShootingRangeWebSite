import "./istaknutePonude.css";
import s1 from "./images/glok19.jpg";
import s2 from "./images/makarov.jpg";
import s3 from "./images/reming870.png";
import s4 from "./images/magnum5.webp";
import s5 from "./images/dragunov.jpg";
import s6 from "./images/m60.jpg";
import useFetch from "../../hooks/useFetch";

const IstaknutePonude = () => {
  const { data, loading, error } = useFetch(
    "/ponude?popularno=true&limit=3"
  );
 
  return (
    <div className="ip">
      {loading ? (
        " Učitava se "
      ) : (
        <>
          {data.map((item) => (
            <div className="ipItem" key={item._id}>
            <div className="offername">{item.naziv}</div>
            <p className="offeritem"> {item.o1}</p>
            <img src={item.slike[0]} alt="" className="ipImg" />
            <span className="eachprice">zasebna cijena: {item.cijenao1}€</span>
            <span className="ipCenter">metaka:{item.brMun1}</span>
            <br />
            <p className="offeritem">{item.o2}</p>
            <img src={item.slike[1]} alt="" className="ipImg" />
            <span className="eachprice">zasebna cijena: {item.cijenao2}€</span>
            <span className="ipCenter">metaka:{item.brMun2}</span>
            <br />
            <span className="ipCity">{item.grad}</span>
            <p className="ipPrice ipCenter">Ukupna cijena: {item.cijena}€ </p>
            {item.ocjena && <div
              className="ipRating">
                <button>{item.ocjena}</button>
                <span>Odlična</span>
            </div>}
              <div className="ipReserv ipCenter">
                <button>SUPER CIJENA!</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default IstaknutePonude;
