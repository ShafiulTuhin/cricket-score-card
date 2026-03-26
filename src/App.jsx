import { useState } from "react";
import "./App.css";

const buttons = [
  { name: "1", score: 1 },
  { name: "2", score: 2 },
  { name: "3", score: 3 },
  { name: "4", score: 4 },
  { name: "5", score: 5 },
  { name: "6", score: 6 },
  { name: "Wide", score: 1 },
  { name: "Wicket", score: 0 },
];
function App() {
  const [score, setScore] = useState(0);
  const [ownScore, setOwnScore] = useState(0);
  const [message, setMessage] = useState("");
  const [wicket, setWicket] = useState(0);
  // const [wide, setWide] = useState(0);
  // const [extra, setExtra] = useState(0);
  const [ball, setBall] = useState(0);
  const [over, setOver] = useState(0);

  const updateScore = (btn) => {
    const { name, score: value } = btn;
    // console.log(name, value);

    const newScore = score + value;
    const newOwnScore = ownScore + value;
    const newWicket = wicket + 1;

    if (name !== "Wide") {
      setOwnScore(newOwnScore);
    }
    if (name === "Wicket") {
      setOwnScore(0);
      setWicket(newWicket);
      setBall(ball + 1);
    }

    setScore(newScore);

    if (value != 0) {
      setBall(ball + 1);
    }
    if (name === "Wide") {
      setBall(ball);
    }
    if (ball >= 5 && name !== "Wide") {
      setOver(over + 1);
      setBall(0);
    }
    if (newWicket >= 5 || over >= 5) {
      setMessage("Game over!");
    } else if (ownScore < 50 && newOwnScore >= 50) {
      setMessage("Congratulations! Half Century!");
    } else if (ownScore < 100 && newOwnScore >= 100) {
      setMessage("Congratulations! Century!");
    } else {
      setMessage("");
    }
  };

  return (
    <div className="max-w-[650px] w-full mx-auto py-5 border-2 border-blue-600 ">
      <h2 className="text-center text-3xl font-bold">Score Card!</h2>
      <div className="divider"></div>
      <h2 className="text-center text-red-500 font-bold mb-5">{message}</h2>
      <div className="flex justify-between items-center px-4">
        <div className="space-y-4">
          <h2 className="text-center font-bold text-2xl ">
            Total Score: {score}
          </h2>
          <h2 className="text-center font-bold text-2xl ">
            Player Score: {ownScore}
          </h2>
        </div>
        <div className="space-y-4">
          <h2 className="text-center font-bold text-2xl">
            Over: {over}.{ball}
          </h2>
          <h2 className="text-center font-bold text-2xl">Wicket: {wicket}</h2>
        </div>
      </div>
      {/* <div className=" flex gap-4 px-4 py-10 text-center">
        <p>Extra: {extra}</p>
        <p>Wide: {wide}</p>
      </div> */}
      <div className="flex flex-wrap justify-center gap-4 py-20 px-5">
        {buttons.map((btn, ind) => (
          <button
            key={ind}
            onClick={() => updateScore(btn)}
            className="btn btn-primary"
            disabled={wicket === 5 || over === 5}
          >
            {btn.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
