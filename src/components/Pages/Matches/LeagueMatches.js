import APIHandler from "../../../services/api.service";
import {useParams} from "react-router";
import {useState, useEffect} from "react";
import BuyerMatchCard from "./BuyerMatchCard";
import "./BuyerMatchCard.css";
import {Spinner} from "react-bootstrap";

const footballAPI = new APIHandler();
function Matches() {
  //   console.log(footballAPI);
  const [matchList, setMatchList] = useState([]);
  const {country} = useParams();

  useEffect(() => {
    footballAPI
      .getAllMatches(country)
      .then((res) => {
        setMatchList(res.data);
      })
      .catch((err) => console.log(err));
  }, [country]);
  return matchList.length === 0 ? (
    <Spinner animation="border" role="status" id="pluswrap">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <br></br>
      <br></br>
      <div className="logo-contenedor">
        <div className="logo-radius">
          <img
            src={
              matchList[0]?.league.name === "Liga Profesional Argentina"
                ? "https://www.ligaprofesional.ar/wp-content/uploads/2022/04/logo-LPF.png"
                : matchList[0]?.league.logo
            }
            alt="Logo"
            className="title-img"
          />
        </div>
        <h2 style={{marginLeft: "15px"}}>{matchList[0]?.league.name}</h2>
      </div>
      <br></br>
      <div className="container">
        {matchList.map((match) => {
          return <BuyerMatchCard match={match} />;
        })}
      </div>
    </>
  );
}

export default Matches;
