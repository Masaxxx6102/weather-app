// WeatherCard: 取得した天気情報をカード形式で表示するコンポーネント
function WeatherCard({ data }) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>
        {data.city}, {data.country}
      </h2>
      <div className="weather-main">
        <img src={iconUrl} alt={data.weather} />
        <span className="temp">{data.temp}°C</span>
      </div>
      <p className="description">{data.weather}</p>
      <div className="details">
        <div className="detail-item">
          <span className="label">湿度</span>
          <span className="value">{data.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">風速</span>
          <span className="value">{data.wind} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
