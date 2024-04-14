import { useState } from "react";
import Card from "./components/Card";
import "./App.css";
import {
  faEnvelope,
  faX,
  faPlus,
  faMinus,
  faStar,
  faGear,
  faCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { CardModel } from "./components/card.model";

function App() {
  const icons = [
    faEnvelope,
    faX,
    faPlus,
    faMinus,
    faStar,
    faGear,
    faCheck,
    faHeart,
    faEnvelope,
    faX,
    faPlus,
    faMinus,
    faStar,
    faGear,
    faCheck,
    faHeart,
  ];

  // creates Card objects out of icon values
  const initializeCards = () => {
    let cards: CardModel[] = icons.map((icon) => {
      {
        return {
          isVisible: true,
          isRotated: true,
          icon: icon,
        };
      }
    });

    return shuffleCards(cards);
  };

  // shuffles cards before display
  const shuffleCards = (cards: CardModel[]) => {
    let updatedCards = [...cards];
    for (let i = updatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [updatedCards[i], updatedCards[j]] = [updatedCards[j], updatedCards[i]]; // Swap elements
    }
    return updatedCards;
  };

  // all necessary states values
  const [cards, setCards] = useState(initializeCards());
  const [firstCardIndex, setFirstCardIndex] = useState(-1);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);

  // starts game on click of the button
  const startGame = () => {
    setIsStarted(true);
    setTimeout(() => {
      setCards((prev) => {
        const updatedCards = [...prev];
        updatedCards.map((card) => {
          card.isRotated = true;
          card.isVisible = true;
          return card;
        });

        return updatedCards;
      });

      setIsStarted(false);
    }, 30000);
  };

  // resarts the screen after user wins
  const playAgain = () => {
    setCards((prev) => {
      const updatedCards = [...prev];
      updatedCards.map((card) => {
        card.isRotated = true;
        card.isVisible = true;
        return card;
      });

      return updatedCards;
    });

    setFirstCardIndex(-1);
    setIsStarted(false);
    setScore(0);
  };

  // handles rotations, pair matching, and visibility of cards
  const handleCardClick = (index: number) => {
    // checks if game started or not
    if (isStarted) {
      // checks if it is the first card or second card
      if (firstCardIndex == -1) {
        //rotate card and set its index as firstCardIndex if it is first one
        setCards((prev) => {
          const updatedCards = [...prev];
          updatedCards[index].isRotated = false;

          return updatedCards;
        });
        setFirstCardIndex(index);
      } else {
        //rotate the clicked card
        setCards((prev) => {
          const updatedCards = [...prev];
          updatedCards[index].isRotated = false;

          return updatedCards;
        });

        // checks if is it the card that is already rotated
        if (index !== firstCardIndex) {
          // checks if the icon names of both cards are same
          if (
            cards[index]?.icon?.iconName ===
            cards[firstCardIndex]?.icon?.iconName
          ) {
            // increases score by one
            setScore((prevScore) => prevScore + 1);

            // after 0.5s make both cards invisible and set firstCardIndex as -1
            setTimeout(() => {
              setCards((prev) => {
                const updatedCards = [...prev];
                updatedCards[index].isVisible = false;
                updatedCards[firstCardIndex].isVisible = false;
                return updatedCards;
              });
            }, 500);
            setFirstCardIndex(-1);
          } else {
            // after 0.3s rotate back both the cards and set firstCardIndex as -1
            setTimeout(() => {
              setCards((prev) => {
                const updatedCards = [...prev];
                updatedCards[index].isRotated = true;
                updatedCards[firstCardIndex].isRotated = true;

                return updatedCards;
              });
            }, 300);
          }
          setFirstCardIndex(-1);
        }
      }
    }
  };

  return (
    <>
      <div className={isStarted ? "timer" : ""}></div>
      <button
        disabled={isStarted}
        className="start-game-btn"
        onClick={startGame}
      >
        Start Game
      </button>
      <div className="game-screen">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              isRotated={card.isRotated}
              isVisible={card.isVisible}
              icon={card.icon}
              onClick={() => {
                handleCardClick(index);
              }}
            />
          );
        })}
      </div>
      <div hidden={score !== 8} className={score == 8 ? "results" : ""}>
        You Won!
        <button onClick={playAgain} className="play-again-btn">
          Play Again
        </button>
      </div>
    </>
  );
}

export default App;
