import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/common/card";
import { useAuth } from "../contexts/auth.context";

function FavCards() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );
      setCards(res.data);
      console.log(res.data);
    })();
  }, [cards]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <PageHeader title={<Logo />} description="why you should use this app" />

      <div className="container my-4">
        <div className="row">
          {currentCards.map((card) => {
            if (card.likes.includes(user._id))
              return (
                <Card
                  key={card._id}
                  url={card.image.url}
                  title={card.title}
                  subtitle={card.subtitle}
                  id={card._id}
                />
              );
          })}
        </div>

        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }).map(
              (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default FavCards;
