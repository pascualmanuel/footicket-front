import APIHandler from "../../../../services/api.service";
import {useParams} from "react-router";
import {useState, useEffect} from "react";
import {Table, Spinner} from "react-bootstrap";

import {formatDate} from "../../../../utils/index";

const footballAPI = new APIHandler();

function NextMatches(props) {
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

  console.log(nextMatchList, "nml de nm");

  return nextMatchList.length === 0 ? (
    <Spinner animation="border" role="status" id="pluswrap">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th colSpan={5}>
              Proximos partidos {nextMatchList[0].league.name}
            </th>
          </tr>
        </thead>

        <tbody>
          {nextMatchList.map((match) => {
            return (
              <tr>
                <td>{formatDate(new Date(match?.fixture.date))}</td>
                <td colSpan={1}>{match.teams.home.name}</td>
                {/* <td colSpan={1}>{match.goals.home}</td> */}
                {/* <td colSpan={1}>{match.goals.away}</td> */}
                <td colSpan={1}>{match.teams.away.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
export default NextMatches;
