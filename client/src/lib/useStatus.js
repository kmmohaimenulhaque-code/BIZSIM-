import { useEffect, useState } from 'react';
import { getStatus } from './api.js';

export function useStatus() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    let alive = true;
    getStatus()
      .then((s) => alive && setStatus(s))
      .catch((e) => alive && setError(e.message));
    return () => { alive = false; };
  }, []);
  return { status, error };
}
