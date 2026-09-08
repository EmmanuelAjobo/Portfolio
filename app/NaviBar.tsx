"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu } from "lucide-react";
import { useColorTheme } from "@/tools/color-theme-provider";
import { useMounted } from "@/tools/useMounted";
import Logo from "@/public/logo";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Introduction", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

export function NaviBar() {
  const { setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const mounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[10vh] border-b glass backdrop-blur-md">
      <div className="container relative flex h-full items-center justify-between px-4 mx-auto">

        {/* Desktop: Left Logo | Mobile: Centered Logo */}
        <div className="flex items-center justify-center max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <Logo size={80} className="text-primary" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <Menubar className="hidden md:flex border-none bg-transparent shadow-none gap-2">
          {NAV_LINKS.map((link) => (
            <MenubarMenu key={link.href}>
              <MenubarTrigger
                className="cursor-pointer font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => {
                  window.location.hash = link.href;
                }}
              >
                {link.label}
              </MenubarTrigger>
            </MenubarMenu>
          ))}

          {/* Desktop Theme Menu */}
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer font-medium">Theme</MenubarTrigger>
            <MenubarContent align="end" className="min-w-35">
              <MenubarRadioGroup
                value={colorTheme}
                onValueChange={(val) => setColorTheme(val as "mint" | "blue")}
              >
                <MenubarRadioItem value="mint" className="cursor-pointer">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00ff99]" />
                    Mint
                  </span>
                </MenubarRadioItem>
                <MenubarRadioItem value="blue" className="cursor-pointer">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0099ff]" />
                    Blue
                  </span>
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Mobile Navigation & Theme Drawer */}
        <div className="flex items-center md:hidden ml-auto">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open Navigation Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              }
            />
            <SheetContent
              side="right"
              className="w-[80vw] sm:max-w-sm flex flex-col justify-between p-6 bg-logo/95 backdrop-blur-md"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="text-left p-0 space-y-0">
                  <SheetTitle className="text-lg font-bold tracking-wider uppercase">
                    Navigation
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-5 pt-2">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Mobile Theme Selector */}
              <div className="border-t pt-4 mt-auto">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Color Accent
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={colorTheme === "mint" ? "default" : "outline"}
                    size="sm"
                    className="w-full gap-2 text-xs"
                    onClick={() => setColorTheme("mint")}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#00ff99]" />
                    MINT
                  </Button>
                  <Button
                    variant={colorTheme === "blue" ? "default" : "outline"}
                    size="sm"
                    className="w-full gap-2 text-xs"
                    onClick={() => setColorTheme("blue")}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#0099ff]" />
                    BLUE
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}