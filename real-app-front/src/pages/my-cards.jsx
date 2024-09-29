import axios from "axios";
import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import { useEffect, useState } from "react";
import { deleteCard } from "../services/cardServices";

function MyCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards"
      );
      setCards(res.data);
    })();
  }, [cards]);
  return (
    <>
      <div className="container">
        <PageHeader title={<Logo />} description="My cards" />
      </div>

      {cards.map((card) => (
        <div
          key={card._id}
          className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
        >
          <div className="card h-100">
            <div
              className="card-img-container"
              style={{ height: "272px", width: "348px" }}
            >
              <img
                src={card.image.url}
                className="card-img-top "
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.subtitle}</p>

              <button
                className="button"
                style={{ width: "35px" }}
                onClick={() => deleteCard(card._id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MyCards;
