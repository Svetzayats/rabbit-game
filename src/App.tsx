import './App.css';

import Game from './Game';

function App() {
  return (
    <div className="container">
       <h1>Rabbit Game</h1>
            <div className="description">
                <p>
                    Rules are simple: there are several holes (from 3 to 10) in
                    a line. One of them is occupied by a rabbit.{' '}
                </p>
                <p>
                    Each night, the rabbit moves to a neighboring hole, either
                    to the left or to the right.{' '}
                </p>
                <p>Each morning, you get to inspect a hole of your choice.</p>
                <p>
                    What strategy would ensure that the fox is eventually
                    caught?
                </p>

                <div>
                    <strong>Important notes:</strong>
                    <ul>
                        <li>
                            Rabbit should jump to neighboring hole each night.
                            He can't stay at occupied hole.
                        </li>
                        <li>You can check just one hole at the time.</li>
                    </ul>
                </div>
            </div>
            <Game />
    </div>
  );
}

export default App;
