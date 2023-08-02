
import { secondsToTime } from '../utils/SecondsToTime';

interface Props{
    mainTimer: number
}

export function Timer(props: Props): JSX.Element{
    return (
        <div className='timer'>
            {secondsToTime(props.mainTimer)}
        </div>
    )

}