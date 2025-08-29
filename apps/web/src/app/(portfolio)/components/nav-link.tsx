"use client";

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { RouteType } from "next/dist/lib/load-custom-routes";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href }: LinkProps<RouteType>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuLink
      asChild
      className={navigationMenuTriggerStyle()}
      active={isActive}
    >
      <Link href={href}>{children}</Link>
    </NavigationMenuLink>
  );
}
