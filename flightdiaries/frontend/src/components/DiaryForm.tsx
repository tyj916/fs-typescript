import { useState } from "react";
import { Weather, Visibility, type NewDiary } from "../types";

interface DiaryFormProps {
  createDiary: (object: NewDiary) => void
}

const DiaryForm = ({ createDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Object.values(Weather)[0]);
  const [visibility, setVisibility] = useState<Visibility>(Object.values(Visibility)[0]);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createDiary({ date, weather, visibility, comment });
    setDate('');
    setWeather(Object.values(Weather)[0]);
    setVisibility(Object.values(Visibility)[0]);
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <div>
          Weather: 
          {Object.values(Weather).map(w => 
            <label key={w}>
              <input 
                type="radio" 
                name="weather" 
                value={w} 
                checked={weather === w}
                onChange={() => setWeather(w)} 
              />
              {w}
            </label>
          )}
        </div>
        <div>
          Visibility: 
          {Object.values(Visibility).map(v => 
            <label key={v}>
              <input 
                type="radio" 
                name="visibility" 
                value={v} 
                checked={visibility === v}
                onChange={() => setVisibility(v)} 
              />
              {v}
            </label>
          )}
        </div>
        <label>
          Comment: <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  )
};

export default DiaryForm;
