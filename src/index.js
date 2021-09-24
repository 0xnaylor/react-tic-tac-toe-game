import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// class Square extends React.Component {
//   // this is a controlled component now because its state is managed by the parent component (Board)
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => {
//           this.props.onClick(); // a button click calls the function passed as a prop from the Board component
//         }}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

// function component can be used here because the Square component does not manage its own state and
// only needs to return the JSX to be rendered. The above class is left in commented out for reference.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // initialise an array to hold the values for each square
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // create a copy of the array
    if (calculateWinner(squares) || squares[i]) {
      // early return from function if a player has already won or the square has already been taken
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} // each Square component takes its value from the state object stored in the Board component.
        onClick={() => this.handleClick(i)} // passes a function to the Square component as a prop
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Player ${winner} has won`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
