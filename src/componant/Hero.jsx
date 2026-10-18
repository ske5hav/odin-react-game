
function Hero() {
  function startGame() {
    document.getElementById("game")

  }

  return (
    <section className="hero" id="home">
      <h1>Memory Test</h1>

      <p>
       @skeshav7050
      </p>

      <button onClick={startGame}>
        Start
      </button>
    </section>
  );
}

export default Hero;
