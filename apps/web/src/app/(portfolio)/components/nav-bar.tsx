import NavLink from "@/app/(portfolio)/components/nav-link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { GithubIcon, LinkedinIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const renderContactLinks = () => {
    return (
      <>
        <NavigationMenuItem>
          <Button variant="secondary" size="icon" asChild>
            <a href="https://github.com/JemyJenesh" target="_blank">
              <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
            </a>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="secondary" size="icon" asChild>
            <a
              href="https://www.linkedin.com/in/jenesh-p-017290211"
              target="_blank"
            >
              <LinkedinIcon className="h-[1.2rem] w-[1.2rem]" />
            </a>
          </Button>
        </NavigationMenuItem>
      </>
    );
  };

  return (
    <div className="sticky top-0 border-b">
      <NavigationMenu
        viewport={false}
        className="px-5 py-3 max-w-6xl mx-auto w-full flex bg-background"
      >
        <Link href={"/"} className="font-medium mr-auto">
          Jenesh
        </Link>

        <NavigationMenuList className="w-full md:hidden">
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <MenuIcon className="h-[1.2rem] w-[1.2rem] scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/projects">Projects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>

          {renderContactLinks()}

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className="hidden md:flex">
          <NavigationMenuItem>
            <NavLink href="/">Home</NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink href="/projects">Projects</NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink href="/about">About</NavLink>
          </NavigationMenuItem>

          {renderContactLinks()}

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
