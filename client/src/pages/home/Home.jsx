import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./home.css";
import Istaknuto from "../../components/istaknuto/Istaknuto";
import StreljanaList from "../../components/streljanaList/StreljanaList";
import IstaknutePonude from "../../components/istaknutePonude/IstaknutePonude";
import Footer from "../../components/footer/Footer";


const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Header/>
      <div className="homeContainer">
        <Istaknuto/>
        <h1 className="homeTitle">Vrste streljana :</h1>
        <StreljanaList/>
        <h1 className="homeTitle">Popularne ponude</h1>
        <IstaknutePonude/>
        <Footer/>
        
      </div>
    </div>
  );
};
export default Home;
