import { useState, useEffect, useCallback } from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

import bellStart from '../sounds/src_sounds_bell-start.mp3';
import bellFinish from '../sounds/src_sounds_bell-finish.mp3';
// import { secondsToMinutes } from "../utils/SecondsToMinutes";
import { secondsToTimes } from "../utils/SecondsToTime";

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number
}
export function PomodoroTimer (props:Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true));
// console.log(cyclesQtdManager)

    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberPomodoros] = useState(0);


    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if(working) setFullWorkingTime(fullWorkingTime + 1);
        },
        timeCounting ? 1000 : null
    );



    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    },[
        setTimeCounting,
        setWorking,
        setResting,
        setMainTime,
        props.pomodoroTime,
    ]);


    const configureRest = useCallback((long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        if(long){
            setMainTime(props.longRestTime)
        }else{
            setMainTime(props.shortRestTime);
        }

        audioStopWorking.play();
    }, [
        setTimeCounting, 
        setWorking, 
        setResting, 
        setMainTime, 
        props.longRestTime, 
        props.shortRestTime
    ]);



    useEffect(() => {
        if(working) document.body.classList.add('working');
        if(working) document.body.classList.add('button_working');
        if(resting) document.body.classList.remove('working');
        if(resting) document.body.classList.remove('button_working')
        if(resting) document.body.classList.add('button_resting');
        


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
            <h2>You are: {working ? 'Working' : 'Resting'}</h2>
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
             <p>Completed Cycles: {completedCycles}</p>
             <p>Time Workings: {secondsToTimes(fullWorkingTime)}</p>
             <p>Completed Pomodoros: {numberOfPomodoros}</p>
            
            </div>
        </div>
    )
}