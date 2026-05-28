import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./Logo";

interface RouteProps {
  href: string;
  label: string;
}

const routes: RouteProps[] = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#showcase", label: "Showcase" },
  { href: "#team", label: "Team" },
  { href: "#engineering", label: "Engineering" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-3 z-40 w-full">
      <div className="container">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4 h-12 pl-5 pr-2 bg-background/85 backdrop-blur-md border border-border rounded-full shadow-lg shadow-black/30 dark:shadow-black/50">
          <a href="/" className="flex items-center gap-2 group shrink-0">
            <Logo size={20} className="text-foreground" />
            <span className="font-display text-lg tracking-tighter leading-none">
              Noddle
            </span>
            <span className="hidden sm:inline eyebrow opacity-70 group-hover:opacity-100 transition-opacity ml-1">
              est. 2026
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {routes.map(({ href, label }, i) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <span className="text-[10px] opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                className="md:hidden px-2 py-1 text-muted-foreground hover:text-foreground"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl tracking-tighter flex items-center gap-2">
                    <Logo size={24} className="text-foreground" />
                    Noddle
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-8">
                  {routes.map(({ href, label }, i) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="font-mono text-sm py-2 flex items-center gap-3 text-muted-foreground hover:text-foreground"
                    >
                      <span className="text-xs opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
