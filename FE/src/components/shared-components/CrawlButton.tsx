"use client";

import { crawlService } from "@/services/crawl/crawl.service";
import { useState } from "react";

type Props = {
  endpoint?: string;
};

export default function CrawlButton({ endpoint = "/api/crawl" }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await crawlService.crawl();
        setMessage(JSON.stringify(res, null, 2));
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          padding: "8px 14px",
          borderRadius: 6,
          border: "1px solid #ccc",
          background: loading ? "#f0f0f0" : "#0070f3",
          color: loading ? "#666" : "#fff",
          cursor: loading ? "default" : "pointer",
        }}
      >
        {loading ? "Running..." : "Start Crawl"}
      </button>
      {message && (
        <div style={{ marginTop: 8, whiteSpace: "pre-wrap", color: "#111" }}>{message}</div>
      )}
    </div>
  );
}
