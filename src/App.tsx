import {PomodoroTimer} from './components/pomodoroTimer';
import './index.css';
import image from './assets/contact-img.svg';


function App(): JSX.Element { 
  return  (

    <div className="container">
      <PomodoroTimer 
      
      pomodoroTime={1500} 
      shortRestTime={600}
      longRestTime={900}
      cycles={4}
      />
      
      <div className='image'>
        <img src={image} alt="" />
      </div>

    </div>
    

  );
}

export default App
