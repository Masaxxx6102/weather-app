import React from "react";

// 天気情報を表示するカードコンポーネント
function WeatherCard({ weather }) {
  // 天気アイコンのURL
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="weather-card">
      {/* 都市名と国コード */}
      <h2 className="weather-city">
        {weather.city}, {weather.country}
      </h2>

      {/* 天気アイコンと説明 */}
      <div className="weather-main">
        <img src={iconUrl} alt={weather.weather} className="weather-icon" />
        <p className="weather-description">{weather.weather}</p>
      </div>

      {/* 気温・湿度・風速などの詳細情報 */}
      <div className="weather-details">
        <div className="weather-detail">
          <span className="detail-label">気温</span>
          <span className="detail-value">{weather.temp}°C</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">体感温度</span>
          <span className="detail-value">{weather.feelsLike}°C</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">湿度</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        <div className="weather-detail">
          <span className="detail-label">風速</span>
          <span className="detail-value">{weather.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
