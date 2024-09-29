import Logo from "./logo";
import PageHeader from "./common/pageHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCardById } from "../services/cardServices";

function CardPage() {
  const [card, setCard] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const res = await getCardById(id);
      setCard(res.data);
    }
    getData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}
      >
        <div
          className="card"
          style={{
            width: "18rem",
            borderRadius: "10px",
            marginBottom: "100px",
            border: "none",
            background: "var(--card-bg)",
            color: "var(--text-color)",
            width: "90vw",
            display: "flex",
            flexDirection: "row",
            maxHeight: "100vh",
            marginLeft: "100px",
            padding: "3%",
            margin: "auto",
          }}
        >
          <img
            style={{ maxHeight: "50vh" }}
            src={card.image?.url}
            className="card-img-top"
            alt={card.image?.alt}
          />
          <div className="card-body" style={{ marginTop: "-2%" }}>
            <h5 className="card-title fs-2">{card.title}</h5>
            <p className="card-text">{card.subtitle}</p>
            <p className="card-text">{card.description}</p>
            <p className="card-text">{card.phone}</p>
            <p className="card-text">email: {card.email}</p>
            <div>
              address:
              <span> {card.address?.country},</span>
              <span> {card.address?.state},</span>
              <span> {card.address?.city},</span>
              <span> {card.address?.street}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardPage;
