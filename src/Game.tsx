import { useCallback, useState } from "react";
import Settings, {ISettings} from "./Settings";
import Holes from "./Holes";

export type IRole = 'rabbit' | 'hunter';

const defaultSettings = {
    holes: 3,
    role: 'rabbit'
} as ISettings;

const Game = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [start, setStart] = useState(false);
    const [rabbitPosition, setRabbitPosition] = useState<number | null>(null);
    const [hint, setHint] = useState('');
    const [hunt, setHunts] = useState<number[]>([]);
    const [huntMove, setHuntMove] = useState('');
    const [congrats, setCongrats] = useState('');

    const startGame = useCallback(() => {
        setCongrats('');
        setHunts([]);
        if (settings.role === 'hunter') {
            setRabbitPosition(Math.floor(Math.random() * (settings.holes + 1)));
            setHint('Guess where is rabbit');
        } else {
            setHint('Choose hole');
        }
        setStart(true);
    }, [setStart]);

    const rabbitJump = () => {
        const currentPos = rabbitPosition || 0;
        let newPos;
        if (currentPos + 1 > settings.holes) {
            newPos = currentPos - 1;
        } else if (currentPos - 1 < 0) {
            newPos = currentPos + 1;
        } else {
            newPos = Math.random() < 0.5 ? currentPos - 1 : currentPos + 1;
        }
        console.log('Rabbit jumped in ' + newPos);
        setRabbitPosition(newPos);

    }

    const hunterTurn = () => {
        const stop = settings.holes % 2 === 0 ? settings.holes - 1 : settings.holes - 2;
        const previousGuess = hunt[hunt.length - 1];
        let guess;
        if (previousGuess !== undefined) {
            guess = previousGuess + 1 > stop ? 1 : previousGuess + 1;
        } else {
            guess = 1;
        }
        const newHunts = [...hunt, guess];
        setHunts(newHunts);
        console.log('Hunter guess is ' + guess);
        return guess;
    }

    const clickHole = (hole: number) => {
        if (settings.role === 'hunter') {
            console.log('Hunter guess is ' + hole);
            if (hole === rabbitPosition) {
                setCongrats('You catched rabbit! You win, congratulations!');
            } else {
                rabbitJump();
                setHint('You missed rabbit! Try again!');
            }
        } else {
            if (rabbitPosition !== null) {
                if (hole === rabbitPosition) {
                setHint('Rabbit can`t stay at the same hole. Please choose adjacent hole.');
                return;
            } 
            if (Math.abs(hole - (rabbitPosition || 0)) > 1) {
                setHint('Rabbit can`t jump so far. Please choose adjacent hole');
                return;
            }
            }
            
            const hunterGuess = hunterTurn();
            if (hole === hunterGuess) {
                setCongrats('Rabbit was caught, you lose');
            } else {
                setHint('Hunter made a mistake! Rabbit should jump in another hole');
            }
            setRabbitPosition(hole);

        }
    }

    return (
        <>
        <Settings settings={settings} setSettings={setSettings} submitCallback={startGame}/>
        {start && 
        <div>
            {congrats && <p>{congrats}</p>}
            {!congrats && <div>
                <p>{hint}</p>
            <Holes quantity={settings.holes} clickHandler={clickHole}/>
                </div>}
            
        </div>}
        </>
    )
}


export default Game;