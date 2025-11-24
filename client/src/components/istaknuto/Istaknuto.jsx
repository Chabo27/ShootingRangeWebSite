import useFetch from "../../hooks/useFetch";
import "./istaknuto.css";

const Istaknuto = () => {
  const { data, loading, error } = useFetch(
    "/streljane/countByGrad?gradovi=podgorica,niksic,bijelopolje"
  );

  return (
    <div className="istaknuto">
      {loading ? (
        "Učitavanje, molimo sačekajte"
      ) : (
        <>
          <div className="istaknutoItem">
            <img
              src="https://i0.wp.com/www.montenegrotravelguide.com/wp-content/uploads/2022/05/things-to-do-podgorica-1.jpeg?fit=1200%2C630&ssl=1"
              alt=""
              className="istaknutoImg"
            />
            <div className="istaknutoTitle">
              <h1>Podgorica</h1>
              <h2>{data[0]} streljane</h2>
            </div>
          </div>
          <div className="istaknutoItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Panorama_Bijelog_Polja.jpg/1280px-Panorama_Bijelog_Polja.jpg"
              alt=""
              className="istaknutoImg"
            />
            <div className="istaknutoTitle">
              <h1>Bijelo Polje</h1>
              <h2>{data[2]} streljana</h2>
            </div>
          </div>
          <div className="istaknutoItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Niksic_v.jpg"
              alt=""
              className="istaknutoImg"
            />
            <div className="istaknutoTitle">
              <h1>Nikšić</h1>
              <h2>{data[1]} streljana</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Istaknuto;
