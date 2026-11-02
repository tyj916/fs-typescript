import { useEffect, useState } from "react"
import axios from "axios";
import type { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries')
      .then(response => {
        setDiaries(response.data as Diary[]);
      })
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.map(diary => 
        <div key={diary.id}>
          <p><strong>{diary.date}</strong></p>
          <p>Weather: {diary.weather}</p>
          <p>Visibility: {diary.visibility}</p>
          {diary.comment && <p>Comment: {diary.comment}</p>}
        </div>
      )}
    </div>
  )
}

export default App
