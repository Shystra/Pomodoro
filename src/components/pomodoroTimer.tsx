import React from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

import bellStart from '../sounds/src_sounds_bell-start.mp3';
import bellFinish from '../sounds/src_sounds_bell-finish.mp3';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number
}
export function PomodoroTimer (props:Props): JSX.Element {
    const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = React.useState(false);
    const [working, setWorking] = React.useState(false);
    const [resting, setResting] = React.useState(false);
    
    React.useEffect(() => {
        if(working) document.body.classList.add('working');
        if(resting) document.body.classList.remove('working')
    }, [working])

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null
    );

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    };
    const configureRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        if(long){
            setMainTime(props.longRestTime)
        }else{
            setMainTime(props.shortRestTime);
        }

        audioStopWorking.play();
    }

    // useInterval(() => {
    //     setMainTime(mainTime - 1);
    // }, null);
    
    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer 
            mainTimer={mainTime}
            ></Timer>

            <div className="controls">
             <Button 
             text="Work" 
             onClick={() => 
             configureWork()}
             ></Button>


            <Button text="Rest" onClick={() => configureRest(false)}></Button>

             <Button
             className={!working && !resting ? 'hidden' : ''} 
             text={timeCounting ? 'Pause' : 'Play'} 
             onClick={() => 
             setTimeCounting(!timeCounting)}
             ></Button>
            </div>



            <div className="datails">
             <p>testing</p>
             <p>testing</p>
             <p>testing</p>
             <p>testing</p>
             <p>testing</p>
            </div>

        </div>
    )
}