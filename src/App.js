import "./App.css";
import {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import MainComponent from './component/Main'

function App() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div >
      <div className="div">
      <DatePicker className="datepicker" selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <MainComponent/>
    </div>
  );
}

export default App;
