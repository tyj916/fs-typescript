import { useEffect, useState } from "react"
import axios from "axios";
import type { Diary, NewDiary } from "./types";
import diaryService from "./services/diary";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState('');
  
  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries);
    });
  }, []);

  const createDiary = async (object: NewDiary) => {
    try {
      const returnedDiary = await diaryService.create(object)
      setDiaries(diaries.concat(returnedDiary));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data.error[0].message);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      {notification && <p>{notification}</p>}

      <DiaryForm createDiary={createDiary} />

      <h2>Diary entries</h2>
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
