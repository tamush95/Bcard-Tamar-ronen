import { useState } from "react";
import { likeUnlikeCard } from "../../services/cardServices";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const handleFavorite = async () => {
    const res = await likeUnlikeCard(props.id);

    setFavorite(!favorite);
  };
  function MoveToCardPage() {
    navigate(`/cardPage/${props.id}`);
  }
  return (
    <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
      <div className="card h-100" style={{ background: "var(--card-bg)" }}>
        <div
          className="card-img-container"
          style={{ height: "272px", width: "348px" }}
        >
          <img
            src={props.url}
            className="card-img-top "
            alt={props.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.subtitle}</p>
          <div
            onClick={handleFavorite}
            className={["bi bi-heart-fill", favorite && "text-danger"].join(
              " "
            )}
          ></div>
          <button
            className="mx-auto"
            style={{
              width: "7em",

              borderRadius: "10px",
            }}
            onClick={MoveToCardPage}
          >
            View card
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
