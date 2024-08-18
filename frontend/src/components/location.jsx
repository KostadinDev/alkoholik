import { useState, useEffect } from 'react';

function useLocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null }),
        (error) => setLocation({ latitude: null, longitude: null, error: error.message })
      );
    } else {
      setLocation({ latitude: null, longitude: null, error: 'Geolocation is not supported by this browser.' });
    }
  }, []);

  return location;
}


export default useLocation;