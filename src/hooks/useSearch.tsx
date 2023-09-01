import React, { useEffect, useState } from "react";
import { Track, search } from "../services/search";

const useSearch = (
  initialQuery: string
): [Track[], boolean, string, React.ChangeEventHandler<HTMLInputElement>] => {
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [actualQ, setActualQ] = useState(decodeURI(initialQuery));
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const newQuery = event.target.value;
    setActualQ(newQuery);
    const newUrl = `/search/${encodeURIComponent(newQuery)}`;
    window.history.replaceState(null, "", newUrl);

    // Clear the previous search timer (if any) and start a new one
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    setSearchTimer(
      setTimeout(() => {
        // Perform the search after a delay of, for example, 500 milliseconds
        setLoading(true);
        search(newQuery).then((searchResults) => {
          setResults(searchResults);
          setLoading(false);
        });
      }, 700) // Adjust the delay as needed
    );
  };

  useEffect(() => {
    // Clear the search timer when the component unmounts
    return () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
    };
  }, [searchTimer]);

  return [results, loading, actualQ, handleInputChange];
};

export { useSearch };
