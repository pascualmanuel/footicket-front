import React from "react";
import axios from "axios";
import "./Payment.css";
import {loadStripe} from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {useHistory} from "react-router-dom";
import APIHandler from "../../../services/api.service";

const stripePromise = loadStripe(
  "pk_test_51K6CRIH1ByOTHJYIK1GUeHbZBB9fDj0e6pgIqEMJzBCCAhBNTi5sAFS5Sp8o4wczaUvt0HkIVgt5lL7kE1HMiBXI00OYrBqhn6"
);

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const ticketService = new APIHandler();

  console.log(props.teamHome, "props.match.teams.home.nameprueba");
  console.log(props, "props.match.teams.away.nameprueba");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const {id} = paymentMethod;
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/matches/checkout`,
        {
          id,
          amount: props.price * 100,
        }
      );
      ticketService
        .createTicket(
          props.price,
          props.matchId,
          props.number,
          props.info,
          props.teamHome,
          props.teamAway
        )
        .then((res) => {
          return ticketService.sendEmail(res.data._id);
        })
        .then((res) => {
          history.push(`/finish/${res.data._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",

        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const history = useHistory();

  return (
    <>
      <form className="form-control" onSubmit={handleSubmit}>
        <CardElement options={cardStyle} />

        <button className="btn btn-success" id="pay" type="submit">
          Pagar
        </button>
      </form>
    </>
  );
};

function Payment(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}

export default Payment;
