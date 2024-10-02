import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/common/card";

function Home(props) {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );
      const filteredCards = res.data.filter((card) =>
        card.title.includes(props.searchValue)
      );
      setCards(filteredCards);
      console.log(props.searchValue);
    })();
  }, [props.searchValue]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container" style={{ fontSize: "1.5em", marginTop: "2em" }}>
      <PageHeader
        title={<Logo />}
        description="Welcome to our great app, where you can create and explore business cards for anything you can possibly imagin."
      />

      <div className="container my-4">
        <div className="row">
          {currentCards.map((card) => (
            <Card
              key={card._id}
              url={card.image.url}
              title={card.title}
              subtitle={card.subtitle}
              id={card._id}
            />
          ))}
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

export default Home;
