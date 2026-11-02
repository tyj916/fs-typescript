// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface Diary {
  id: number,
  date: string,
  // weather: Weather,
  // visibility: Visibility,
  weather: string,
  visibility: string,
  comment?: string,
}

export type NewDiary = Omit<Diary, 'id'>
