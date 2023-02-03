import {useState, useEffect} from "react";
import APIHandler from "../../services/api.service";

function TicketCard(props) {
  const [matchInfo, setMatchInfo] = useState({});
  const apiService = new APIHandler();

  useEffect(() => {
    apiService
      .getMatchInfo(props.ticket.match_id)
      .then((res) => {
        setMatchInfo({
          home: res.data.response[0].teams?.home.name,
          away: res.data.response[0].teams?.away.name,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <p>
        Partido: {matchInfo.home} - {matchInfo.away}
      </p>
      <p>Número de entradas: {props.ticket.numberOfTickets}</p>
      <p>Precio de entradas: €{props.ticket.totalPrice}</p>
      <hr></hr>
    </>
  );
}

export default TicketCard;
