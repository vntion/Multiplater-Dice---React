export default function Section({ className, player, score, currScore }) {
  return (
    <section className={`player ${className}`}>
      <h2 className="name">{player}</h2>
      <p className="score">{score}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">{currScore}</p>
      </div>
    </section>
  );
}
