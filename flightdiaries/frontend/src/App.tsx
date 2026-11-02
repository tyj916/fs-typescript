import { useEffect, useState } from "react"
import type { Diary, NewDiary } from "./types";
import diaryService from "./services/diary";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries);
    });
  }, []);

  const createDiary = (object: NewDiary) => {
    diaryService.create(object)
      .then(returnedDiary => {
        setDiaries(diaries.concat(returnedDiary));
      });
  }

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

      <DiaryForm createDiary={createDiary} />
    </div>
  )
}

export default App
