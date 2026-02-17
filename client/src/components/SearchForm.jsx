// SearchForm: 都市名を入力して検索するフォームコンポーネント
import { useState } from 'react';

function SearchForm({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="都市名を入力（例: Tokyo, London）"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        検索
      </button>
    </form>
  );
}

export default SearchForm;
