// App: 検索状態と天気データを管理するルートコンポーネント
import { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';

const API_URL = 'http://localhost:3001/api/weather';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // バックエンドAPIから天気データを取得する
  const searchWeather = async (city) => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(`${API_URL}?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || '天気データの取得に失敗しました');
      } else {
        setWeather(data);
      }
    } catch {
      setError('サーバーに接続できません。バックエンドが起動しているか確認してください');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>天気アプリ</h1>
      <SearchForm onSearch={searchWeather} loading={loading} />
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">読み込み中...</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
