"use client";

import CrawlButton from "@/components/shared-components/CrawlButton";

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Test Crawl API</h1>
      <p>Nhấn nút bên dưới để gọi API crawl (POST /api/crawl)</p>
      <CrawlButton />
    </main>
  );
}
