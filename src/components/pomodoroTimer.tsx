import React from "react";
import { useInterval } from "../hooks/useInterval";
import { Button } from "./button";
import { Timer } from "./timer";

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number
}
export function PomodoroTimer (props:Props): JSX.Element {
    const [mainTime, setMainTime] = React.useState(props.pomodoroTime)
    
    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);
    
    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer mainTimer={mainTime}></Timer>

            <div className="controls">
             <Button text="teste" onClick={() => console.log(1)}></Button>
                <Button text="teste" onClick={() => console.log(1)}></Button>
             <Button text="teste" onClick={() => console.log(1)}></Button>
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