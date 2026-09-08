"use client";
import {ThemeProvider as NextThemeProvider} from "next-themes";
import {useTheme} from "next-themes";
import {ReactNode, useEffect, useState} from "react";

export function ThemeProvider({children}: {children: ReactNode}) {

    return (
        <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </NextThemeProvider>
    );
}