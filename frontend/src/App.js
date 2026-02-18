import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  // 状態管理
  const [city, setCity] = useState(""); // 入力された都市名
  const [weather, setWeather] = useState(null); // 天気データ
  const [error, setError] = useState(""); // エラーメッセージ
  const [loading, setLoading] = useState(false); // ローディング状態

  // 天気データを取得する関数
  const fetchWeather = async (e) => {
    e.preventDefault();

    // 空文字チェック
    if (!city.trim()) {
      setError("都市名を入力してください");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // バックエンドAPIにリクエストを送信
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city.trim())}`
      );
      const data = await response.json();

      if (!response.ok) {
        // エラーレスポンスの場合
        setError(data.error || "天気データの取得に失敗しました");
      } else {
        // 成功した場合、天気データをセット
        setWeather(data);
      }
    } catch (err) {
      setError("サーバーに接続できません。バックエンドが起動しているか確認してください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">天気アプリ</h1>

      {/* 都市名入力フォーム */}
      <form className="search-form" onSubmit={fetchWeather}>
        <input
          type="text"
          className="search-input"
          placeholder="都市名を入力（例: Tokyo, Osaka）"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "検索中..." : "検索"}
        </button>
      </form>

      {/* エラーメッセージ表示 */}
      {error && <p className="error">{error}</p>}

      {/* 天気カード表示 */}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
