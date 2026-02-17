// Express サーバー: OpenWeatherMap APIへのプロキシとして機能し、
// APIキーをフロントエンドに露出させずに天気データを返す
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// フロントエンド（Vite dev server）からのリクエストを許可
app.use(cors());

// 天気情報取得エンドポイント
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: '都市名を指定してください' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return res.status(500).json({ error: 'APIキーが設定されていません。server/.env を確認してください' });
  }

  try {
    // OpenWeatherMap API にリクエスト（日本語・摂氏で取得）
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ja`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const message = data.cod === '404'
        ? `「${city}」が見つかりません`
        : '天気データの取得に失敗しました';
      return res.status(response.status).json({ error: message });
    }

    // フロントエンドに必要なデータだけ整形して返す
    res.json({
      city: data.name,
      country: data.sys.country,
      weather: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      wind: data.wind.speed,
    });
  } catch (err) {
    console.error('API通信エラー:', err.message);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});
