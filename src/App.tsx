import {PomodoroTimer} from './components/pomodoroTimer'


function App(): JSX.Element { 
  return  (

    <div className="container">
      <PomodoroTimer 
      pomodoroTime={10} 
      shortRestTime={2}
      longRestTime={5}
      cycles={4}
      />
    </div>

  );
}

export default App
