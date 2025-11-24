import "./footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhoneVolume,
    faEnvelopeOpenText,
    faPersonRifle
  } from "@fortawesome/free-solid-svg-icons";

const MailLista=()=>{
    return(
        <div id="footer">

        <div id="main">

       <div className="info">
        <div id="infotitle1">

       <FontAwesomeIcon className="icon" icon={faPersonRifle} />
       <h1 className="i1Title">Rezerviši nezaboravno iskustvo!</h1>
        </div>
       <p1 className="i1Desc">Isprobaj naše streljane na otvorenom, zatvorenom, sa najsavremenijim standardima po pitanju bezbjednosti i obuke!
       Naši instruktori će Vam pomoći da savladate rukovanje svim vrstama oružja, kao i način rasklapanja i održavanja istog.
       Nema potrebe za čekanjem! Rezerviši još danas i osiguraj novo iskustvo!
       </p1>
       
       
       </div>

       <div className="info">
            <h1 className="infoTitle">
                KONTAKT PODRŠKA
            </h1>
            <div id="info1">

        <div>
        <FontAwesomeIcon className="icon"icon={faPhoneVolume} />
        </div>
        <div id="iphonenumbers">
            <span>+382 555 333</span>
            <span>+382 111 222</span>
        </div>
            </div>
            <div id="info1">
            <FontAwesomeIcon className="icon "icon={faEnvelopeOpenText} />
            <span>skpogodak27@gmail.com</span>
            </div>
       </div>
        </div>
       <div className="fText">Copyright 2023 SK Pogodak</div>
        </div>
    )
}

export default MailLista