import APIHandler from "../../../services/api.service";
import {useParams} from "react-router";
import {useState, useEffect} from "react";
import NextMatches from "./NextMatches/NextMatches";
import Positions from "./Positions/Positions";
import "./Standing.css";
import "./Positions/Positions.css";

const footballAPI = new APIHandler();

function Standings() {
  const [nextMatchList, setNextMatchList] = useState([]);
  const {country} = useParams();

  useEffect(() => {
    footballAPI
      .getNextMatches(country)
      .then((res) => {
        setNextMatchList(res.data);
        console.log(country, "hola soy res.dalistta");
      })

      .catch((err) => console.log(err));
  }, [country]);

  return (
    <>
      <div className="standings-container">
        <div className="positions">
          <Positions />
        </div>
        <div className="next-matches">
          <NextMatches />
        </div>
      </div>
    </>
  );
}
export default Standings;
