// 必要なモジュールの読み込み
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORSを有効にする（フロントエンドからのリクエストを許可）
app.use(cors());

// JSONリクエストボディの解析を有効にする
app.use(express.json());

// 天気情報を取得するAPIエンドポイント
app.get("/api/weather", async (req, res) => {
  const { city } = req.query;

  // 都市名が指定されていない場合はエラーを返す
  if (!city) {
    return res.status(400).json({ error: "都市名を指定してください" });
  }

  // 環境変数からAPIキーを取得
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    return res.status(500).json({
      error: "APIキーが設定されていません。backend/.envファイルを確認してください",
    });
  }

  try {
    // OpenWeatherMap APIにリクエストを送信（日本語・摂氏で取得）
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ja`;
    const response = await fetch(url);
    const data = await response.json();

    // APIからエラーが返された場合
    if (data.cod !== 200) {
      return res.status(data.cod).json({
        error: data.message || "天気データの取得に失敗しました",
      });
    }

    // フロントエンドに必要なデータだけを返す
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      weather: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    res.json(weatherData);
  } catch (error) {
    console.error("天気データ取得エラー:", error.message);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました`);
});
