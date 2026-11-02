import { useEffect, useState } from "react"
import type { Diary } from "./types";
import diaryService from "./services/diary";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries);
    });
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
