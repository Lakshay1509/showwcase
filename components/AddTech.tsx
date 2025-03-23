'use client';
import { useState } from "react";

export default function MetadataForm() {
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/fetch-metadata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) throw new Error("Failed to fetch metadata");
      const data = await response.json();
      setMetadata(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Fetch Website Metadata</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">{loading ? "Fetching..." : "Fetch Metadata"}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {metadata && (
        <div>
          <h2>Metadata:</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
