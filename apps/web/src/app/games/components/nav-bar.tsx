import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 border-b z-50">
      <NavigationMenu
        viewport={false}
        className="px-5 py-3 max-w-6xl mx-auto w-full flex bg-background"
      >
        <Link href={"/games"} className="font-medium mr-auto">
          Jen-games
        </Link>

        <NavigationMenuList>
          <NavigationMenuItem>
            <Button variant="secondary" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                Portfolio <ExternalLinkIcon />
              </a>
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
