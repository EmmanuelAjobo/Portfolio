"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useColorTheme } from "@/tools/color-theme-provider";
import { useMounted } from "@/tools/useMounted";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();

  // theme/colorTheme are unknown on the server, so we wait until after
  // the client has mounted before rendering any text that depends on them.
  const mounted = useMounted();
  if (!mounted) return <></>;

  return (
    <div className="flex absolute top-4 right-4 space-x-2 z-5 w-50 h-12 items-center justify-end">
      {/* Light / Dark Mode Controls */}
      <div className="flex">
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={"bg-ring"}
          size="sm"
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </Button>
      </div>

      {/* Accent Color Controls */}
      <div className="flex">
        <Button
          onClick={() => setColorTheme(colorTheme === "mint" ? "blue" : "mint")}
          className={"bg-primary"}
          size="sm"
        >
          {colorTheme === "mint" ? "Mint" : "Blue"}
        </Button>
      </div>
    </div>
  );
};