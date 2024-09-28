import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("query", query);
    setSearchParams(newParams);
  }, [query, searchParams, setSearchParams]);

  return (
    <input
      placeholder="Search...."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full px-6 py-4 text-gray-800 font-semibold text-lg outline-none border border-gray-500 rounded-2xl"
    />
  );
}
