import './App.css';
import { UseState } from './Components/UseState';
import { ClassState } from './Components/ClassState';
import { UseReducer } from './Components/UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <UseReducer name="Use Reducer"/>
      <ClassState name="Class State"/>

    </div>
  );
}

export default App;
