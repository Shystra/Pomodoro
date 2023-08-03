
import { secondsToMinutes } from '../utils/SecondsToMinutes';

interface Props{
    mainTimer: number
}

export function Timer(props: Props): JSX.Element{
    return (
        <div className='timer'>
            {secondsToMinutes(props.mainTimer)}
        </div>
    )

}