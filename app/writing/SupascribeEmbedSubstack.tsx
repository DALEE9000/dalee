// components/SupascribeEmbed.tsx
"use client";

import { useEffect } from "react";

interface SupascribeEmbedProps {
  embedId: string;
}

export default function SupascribeEmbed({ embedId }: SupascribeEmbedProps) {
  useEffect(() => {
    // Load Supascribe script
    const script = document.createElement("script");
    script.src = `https://js.supascribe.com/v1/loader/${embedId}.js`;
    script.async = true;
    document.body.appendChild(script);
  }, [embedId]);

  return (
    <div data-supascribe-embed-id={embedId} data-supascribe-subscribe></div>
  );
}