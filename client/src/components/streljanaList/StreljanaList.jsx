import useFetch from "../../hooks/useFetch";
import "./streljanaList.css";
const StreljanaList = () => {
  const { data, loading, error } = useFetch("/streljane/countByVrsta");
  const images = [
    "https://cdn.pixabay.com/photo/2018/10/27/22/48/long-range-shooting-3777583_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/11/06/21/15/gun-5718928_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/09/26/19/42/pistol-4506882_1280.jpg",
  ];
  return (
    <div className="sList">
      {loading ? (
        "Učitavanje"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="sListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="sListImg"
                />
                <div className="sListTitle">
                  <h1>{data[i]?.type} streljana</h1>
                  <h2>broj streljana:{data[i]?.count} </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
export default StreljanaList;
