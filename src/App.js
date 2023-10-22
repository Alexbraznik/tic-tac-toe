import React, { useState } from "react";
import "./App.css";

function useGameState() {
  const symbol_X = "X";
  const symbol_O = "O";

  const [stateArr, setStateArr] = useState(Array(9).fill(null));
  const [currentStep, setCurrentStep] = useState(symbol_X);
  const [determineWinner, setDetermineWinner] = useState();
  const [stepName, setStepName] = useState("Ход: ");

  const handleClick = (index) => {
    if (stateArr[index] || determineWinner) {
      return;
    }
    {
      const copyArr = [...stateArr];
      copyArr[index] = currentStep;
      const winner = calculateWinner(copyArr);
      const draw = copyArr.every((item) => item !== null);
      let tempStepName = "Ход: ";
      if (winner) {
        tempStepName = "Победил: ";
        setDetermineWinner(winner);
      } else if (draw) {
        tempStepName = "Ничья";
      } else {
        setCurrentStep(currentStep === symbol_X ? symbol_O : symbol_X);
        tempStepName = "Ход: ";
      }

      setStateArr(copyArr);
      setStepName(tempStepName);
    }
  };

  const resetClick = () => {
    const resetArr = Array(9).fill(null);
    setStateArr(resetArr);
    setCurrentStep(symbol_X);
    setDetermineWinner(null);
    setStepName("Ход: ");
  };
  function calculateWinner(cell) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cell[a] && cell[a] === cell[b] && cell[a] === cell[c]) {
        return cell[a];
      }
    }
    return null;
  }
  return {
    symbol_X,
    symbol_O,
    stateArr,
    currentStep,
    determineWinner,
    stepName,
    handleClick,
    resetClick,
    calculateWinner,
  };
}

function App() {
  const {
    stateArr,
    currentStep,
    determineWinner,
    stepName,
    handleClick,
    resetClick,
  } = useGameState();

  return (
    <div className="App">
      <div className="container">
        <GameInfo
          stepName={stepName}
          currentStep={currentStep}
          determineWinner={determineWinner}
        />
        <div className="cell-container">
          {stateArr.map((el, index) => (
            <GameCell el={el} onClick={() => handleClick(index)} />
          ))}
        </div>
        <button onClick={resetClick} className="reset">
          Начать заново
        </button>
      </div>
    </div>
  );
}

function GameInfo({ stepName, currentStep, determineWinner }) {
  return (
    <h1>
      {stepName === "Ничья" ? "Ничья" : stepName}
      <span className={`step--${currentStep}`}>
        {stepName === "Ничья"
          ? ""
          : determineWinner
          ? determineWinner
          : currentStep}
      </span>
    </h1>
  );
}

function GameCell({ onClick, el }) {
  const currentSymbol = el === "X" ? "X" : "O";
  return (
    <div onClick={onClick} className={`cell step--${currentSymbol} `}>
      {el}
    </div>
  );
}
export default App;
