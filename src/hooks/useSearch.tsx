import React, { useEffect, useState } from "react";
import { Track, search } from "../services/search";

const useSearch = (
  initialQuery: string
): [Track[], boolean, string, React.ChangeEventHandler<HTMLInputElement>] => {
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [actualQ, setActualQ] = useState(decodeURI(initialQuery));

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const newQuery = event.target.value;
    setActualQ(newQuery);
    const newUrl = `/search/${encodeURIComponent(newQuery)}`;
    window.history.replaceState(null, "", newUrl);
  };
  
  useEffect(() => {
    setLoading(true);
    search(actualQ).then((searchResults) => {
      setResults(searchResults);
      setLoading(false);
    });
  }, [actualQ]);

  return [results, loading, actualQ, handleInputChange];
};

export {useSearch}