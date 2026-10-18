
import { useState, useEffect } from "react";

function CardGrid({ score, setScore, setBestScore }) {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getCards() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=12"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

        const data = await response.json();

        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);

            if (!res.ok) {
              throw new Error("Failed to fetch Pokémon details");
            }

            return await res.json();
          })
        );

        setCards(pokemonData);
      } catch (err) {
        setError("Pokémon load nahi hue. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getCards();
  }, []);

  function shuffleCards() {
    setCards((previousCards) => {
      const shuffled = [...previousCards];

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [
          shuffled[j],
          shuffled[i],
        ];
      }

      return shuffled;
    });
  }

  function handleCardClick(id) {
    if (clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;

      setScore(newScore);

      setBestScore((previousBest) =>
        Math.max(previousBest, newScore)
      );

      setClickedCards((previous) => [...previous, id]);
    }

    shuffleCards();
  }

  if (loading) {
    return (
      <p className="status-message">
        Loading Pokémon cards...
      </p>
    );
  }

  if (error) {
    return (
      <p className="status-message">
        {error}
      </p>
    );
  }

  return (
    <section className="game-section" id="game">
      <h2>Choose Your Cards</h2>

      <div className="card-grid">
        {cards.map((card) => (
          <button
            className="card"
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            aria-label={`Choose ${card.name}`}
          >
            <img
              src={
                card.sprites.other?.["official-artwork"]
                  ?.front_default ||
                card.sprites.front_default
              }
              alt={card.name}
            />

            <h3>
              {card.name.charAt(0).toUpperCase() +
                card.name.slice(1)}
            </h3>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CardGrid;
