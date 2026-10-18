
import { useState } from "react";
import Navbar from "./componant/Navbar";
import Hero from "./componant/Hero";
import Scoreboard from "./componant/Scoreboard";
import CardGrid from "./componant/CardGrid";

import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <>
      <Navbar />
      <Hero />

      <Scoreboard
        score={score}
        bestScore={bestScore}
      />

      <CardGrid
        score={score}
        setScore={setScore}
        setBestScore={setBestScore}
      />
    </>
  );
}

export default App;
