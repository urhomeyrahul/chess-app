import ChessBoard from "./components/Chessboard";
import './App.css';

function App() {
  return (
    <div className="contentContainer">
      <div className="customCard">
        <h1 className="text-color white">React Chess Game</h1>
        <ChessBoard />
      </div>
    </div>
  );
}

export default App;
