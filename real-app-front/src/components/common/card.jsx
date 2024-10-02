import { useState } from "react";
import { likeUnlikeCard } from "../../services/cardServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

function Card(props) {
  const { user } = useAuth();
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
      <div
        className="card h-100"
        style={{
          background: "var(--card-bg)",
          width: "500px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          className="card-img-container"
          style={{ height: "300px", width: "100%" }}
        >
          <img
            src={props.url}
            className="card-img-top "
            alt={props.title}
            style={{
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          className="card-body d-flex flex-column justify-content-center align-items-center"
          style={{ maxWidth: "80vw", overflow: "hidden" }}
        >
          <h5
            className="card-title"
            style={{ fontWeight: "bold", fontSize: "1em" }}
          >
            {props.title}
          </h5>
          <p className="card-text">{props.subtitle}</p>
          {user && (
            <div
              onClick={handleFavorite}
              className={["bi bi-heart-fill", favorite && "text-danger"].join(
                " "
              )}
            ></div>
          )}
          <button
            className="mx-auto"
            style={{
              width: "7em",
              position: "absolute",
              bottom: "3%",
              borderRadius: "10px",
              margin: "auto",
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
