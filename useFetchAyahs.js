import { useState, useEffect } from 'react';

export default function useFetchAyahs() {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAyahs = async (surahNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
      const json = await response.json();

      if (json.code === 200 && json.data) {
        setSelectedSurah(json.data);
      } else {
        console.error("Error: Unexpected response format", json);
      }
    } catch (error) {
      console.error("Error fetching Ayahs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   /// console.log("");
    
    return () => {
      setSelectedSurah(null);  // ✅ Reset when leaving the Ayah screen
    };
  }, []);

  return { selectedSurah, setSelectedSurah, fetchAyahs, loading };
}
