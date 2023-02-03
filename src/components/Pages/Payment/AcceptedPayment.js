// // import {Form, Row, Col, Button} from "react-bootstrap";
// /* <h2> Pago Exitoso</h2>; */
// // import {useState} from "react";
// // import axios from "axios";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function AcceptedPayment() {
  return (
    <div className="card-accepted">
      <Card>
        <Card.Header>Compra Finalizada</Card.Header>
        <Card.Body>
          <Card.Title>¡Gracias por confiar en FooTicket!</Card.Title>
          <Card.Text>
            En breve recibirás un mail con tus Tickets para el partido. O
            recibirás la información adecuada de donde y en que horario retriar
            los tickets del partido.
          </Card.Text>
          <Link className="button-details" to={"/"}>
            Inicio
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
export default AcceptedPayment;
