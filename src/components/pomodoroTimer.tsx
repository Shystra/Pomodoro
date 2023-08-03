import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

import bellStart from '../sounds/src_sounds_bell-start.mp3';
import bellFinish from '../sounds/src_sounds_bell-finish.mp3';
import { secondsToTime } from "../utils/SecondsToTime";

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
    const [cyclesQtdManager, setCyclesQtdManager] = React.useState(new Array(props.cycles - 1).fill(true));
// console.log(cyclesQtdManager)


    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberPomodoros] = useState(0);




    
    
    

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



    React.useEffect(() => {
        if(working) document.body.classList.add('working');
        if(resting) document.body.classList.remove('working');

        if(mainTime > 0) return;

        if(working && cyclesQtdManager.length > 0){
            configureRest(false);
            cyclesQtdManager.pop()
        }else if(working && cyclesQtdManager.length <= 0){
            configureRest(false);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }
        if(working) setNumberPomodoros(numberOfPomodoros + 1);
        if(resting) configureWork();
    }, [
        working, 
        resting, 
        mainTime, 
        cyclesQtdManager,
        numberOfPomodoros,
        completedCycles, 
        configureRest, 
        setCyclesQtdManager, 
        configureWork,
        props.cycles,
    ])



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
             <p>Ciclos Concluídos: {completedCycles}</p>
             <p>Horas Trabalhadas: {secondsToTime(fullWorkingTime)}</p>
             <p>Pomodoros Concluídos: {numberOfPomodoros}</p>
            
            </div>

        </div>
    )
}