import { useEffect, useState } from 'react';

export function WeatherWidget() {
    const [weather, setWeather] = useState<any>(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&current_weather=true')
      .then(res => res.json())
      .then(data => setWeather(data.current_weather))
      .catch(err => console.error("Błąd pogody:", err));
  }, []);

  if (!weather) return <span>Ładowanie pogody...</span>;

  const isRaining = [61, 63, 65, 80, 81, 82].includes(weather.weathercode);

  return (
    <div className="flex items-center gap-2 p-2 border rounded shadow-sm">
      <span>{weather.temperature}°C</span>
      {isRaining ? <span>🌧️ Pada deszcz!</span> : <span>☀️ Pogodnie</span>}
    </div>
  );
}