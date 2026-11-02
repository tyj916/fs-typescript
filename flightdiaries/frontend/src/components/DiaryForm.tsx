import { useState } from "react";
import type { NewDiary } from "../types";

interface DiaryFormProps {
  createDiary: (object: NewDiary) => void
}

const DiaryForm = ({ createDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createDiary({ date, weather, visibility, comment });
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date: <input value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <label>
          Weather: <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </label>
        <br />
        <label>
          Visibility: <input value={visibility} onChange={(e) => setVisibility(e.target.value)} />
        </label>
        <br />
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
