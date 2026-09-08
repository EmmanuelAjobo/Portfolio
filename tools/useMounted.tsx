"use client";
import { useState, useEffect } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Use this to guard any theme-dependent text/conditional UI so the
 * first client render matches the server render exactly, avoiding
 * hydration mismatches.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}