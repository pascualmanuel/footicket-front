import APIHandler from "../../../services/api.service";
import {Card, ListGroup, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import BuyerMatchCard from "./BuyerMatchCard";
import "./BuyerMatchCard.css";
import {Spinner} from "react-bootstrap";

function TeamTickets() {
  const [allMatches, setAllMatches] = useState([]);
  const [dbInfo, setdbInfo] = useState([]);

  const matchService = new APIHandler();

  useEffect(() => {
    matchService
      .getAllTicketsMatches()
      .then((res) => {
        console.log(res.data);
        setAllMatches(res.data.allMatches);
        setdbInfo(res.data.dbInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  return allMatches.length === 0 ? (
    <Spinner animation="border" role="status" id="pluswrap">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <h2> Partidos con entradas </h2>
      <div className="container">
        {allMatches.map((match) => {
          return <BuyerMatchCard key={match.fixture.id} match={match} />;
        })}
      </div>
    </>
  );
}

export default TeamTickets;
