import { useState } from "react";
import "./App.css";
import Logo from "./assets/logo.jpg";

const buttons = [
  { name: "1", score: 1 },
  { name: "2", score: 2 },
  { name: "3", score: 3 },
  { name: "4", score: 4 },
  { name: "5", score: 5 },
  { name: "6", score: 6 },
  { name: "Wide", score: 1 },
  { name: "No-Ball", score: 1 },
  { name: "Wicket", score: 0 },
];
function App() {
  const [score, setScore] = useState(0);
  const [ownScore, setOwnScore] = useState(0);
  const [message, setMessage] = useState("");
  const [wicket, setWicket] = useState(0);
  const [playerName, setPlayerName] = useState([]);
  const [wide, setWide] = useState(0);
  const [noBall, setNoBall] = useState(0);
  const [ball, setBall] = useState(0);
  const [over, setOver] = useState(0);
  const [fallOfWickets, setFallOfWickets] = useState([]);

  const updateScore = (btn) => {
    const { name, score: value } = btn;
    const newScore = score + value;
    const newOwnScore = ownScore + value;
    const newWicket = wicket + 1;
    const newBall = ball + 1;
    const newOver = over + 1;

    // Set player own score
    if (name !== "Wide") {
      setOwnScore(newOwnScore);
    }
    // set total score
    setScore(newScore);
    //Count ball
    setBall(newBall);
    // count ball wihtout a wide ball and set total wide
    if (name === "Wide") {
      setBall(ball);
      setWide(wide + 1);
    }
    //Count ball without a no-ball and set total no-ball
    if (name === "No-Ball") {
      setBall(ball);
      setNoBall(noBall + 1);
    }
    //Set message for 50 and 100 score for a player
    if (ownScore < 50 && newOwnScore >= 50) {
      setMessage("Congratulations! Half Century!");
    } else if (ownScore < 100 && newOwnScore >= 100) {
      setMessage("Congratulations! Century!");
    } else {
      setMessage("");
    }
    //
    if (newBall >= 6 && name !== "Wide" && name !== "No-Ball") {
      setOver(newOver);
      setBall(0);

      if (newOver >= 5) {
        setMessage("Game over!");
      }
    }
    if (name === "Wicket") {
      setOwnScore(0);
      setWicket(newWicket);
      setBall(newBall);
      setFallOfWickets((prev) => [...prev, `${newScore}/${newWicket}`]);
      setPlayerName((prev) => [
        ...prev,
        `Batsman-${newWicket}: ${newOwnScore}`,
      ]);
    }
  };

  return (
    <div className="max-w-[650px] w-full mx-auto py-5 border-2 border-blue-600">
      <div className="flex justify-center gap-3 items-center text-3xl font-bold">
        <img src={Logo} alt="" className="w-12 h-12" />
        <h2> Score Card!</h2>
      </div>
      <div className="divider"></div>
      <h2 className="text-center text-red-500 font-bold mb-5">{message}</h2>
      <div className="flex justify-between items-center px-4">
        <div className="space-y-4">
          <h2 className="text-start font-bold text-2xl">Total Run: {score}</h2>
          <h2 className="text-center font-bold text-2xl ">
            Player's Run: {ownScore}
          </h2>
        </div>
        <div className="space-y-4">
          <h2 className="text-center font-bold text-2xl">
            Over: {over}.{ball}
          </h2>
          <h2 className="text-center font-bold text-2xl">Wicket: {wicket}</h2>
        </div>
      </div>
      <div className="px-4 mt-4">
        <h2 className="font-bold ">Batting:</h2>
        {playerName.map((player, ind) => (
          <h2 className="" key={ind}>
            {player}
          </h2>
        ))}
      </div>
      <div className="flex gap-5 px-4 pt-5">
        <h2 className="font-bold">Extras:</h2>
        <div className="flex justify-between items-center gap-10">
          <h2>Wide: {wide}</h2>
          <h2>No ball: {noBall}</h2>
          <h2>Total: {wide + noBall}</h2>
        </div>
      </div>
      <div className="px-4  mt-2">
        <h2 className="font-bold">
          Wicket fall:
          {fallOfWickets.map((wicket, ind) => (
            <span key={ind} className="mx-5 font-normal text-red-600">
              {wicket}
            </span>
          ))}
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-20 px-5 sm:w-[400px] w-full mx-auto">
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
