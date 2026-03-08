"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface RealtimeData {
  votes: Record<string, number>;
  viewers: string[];
}

const POLL_INTERVAL = 5_000; // 5 seconds

export function useRealtimeUpdates(searchId: string, viewerName: string) {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [viewers, setViewers] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const poll = useCallback(async () => {
    if (document.hidden) return;

    try {
      const params = viewerName
        ? `?viewer=${encodeURIComponent(viewerName)}`
        : "";
      const res = await fetch(`/api/search/${searchId}/poll${params}`);
      if (res.ok) {
        const data: RealtimeData = await res.json();
        setVotes(data.votes);
        setViewers(data.viewers);
      }
    } catch {
      // Silently ignore poll errors
    }
  }, [searchId, viewerName]);

  useEffect(() => {
    // Initial poll
    poll();

    intervalRef.current = setInterval(poll, POLL_INTERVAL);

    function handleVisibility() {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        poll();
        intervalRef.current = setInterval(poll, POLL_INTERVAL);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [poll]);

  return { votes, viewers };
}
