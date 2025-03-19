import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-medium">
            Your App Name
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <SignOutButton />
        </nav>
      </div>
    </header>
  );
}