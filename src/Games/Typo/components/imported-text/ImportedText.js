import "./imported-text.css";
const ImportedText = () => {
  return (
    <section>
      {
        <p className="imported-text">
          Cricket is a bat-and-ball game played between two teams of eleven
          players on a field at the centre of which is a 22-yard (20-metre)
          pitch with a wicket at each end, each comprising two bails balanced on
          three stumps. The batting side scores runs by striking the ball bowled
          at one of the wickets with the bat and then running between the
          wickets, while the bowling and fielding side tries to prevent this (by
          preventing the ball from leaving the field, and getting the ball to
          either wicket) and dismiss each batter (so they are "out").
        </p>
      }
    </section>
  );
};

export default ImportedText;
