import Link from "next/link";
import { siteConfig, primaryNav, type NavLink } from "@/config/site";
import { Container, Logo } from "@/components/ui";

/**
 * Minimal foundation footer. Expand with newsletter capture,
 * region/locale selector, and social links as those features land.
 */
export function Footer() {
  // Groups without an `href` (e.g. "Clothing") are grouping-only
  // headers for the nav rail/drawer — flatten them to their children
  // here so the footer only ever lists real, navigable links.
  const footerLinks: NavLink[] = primaryNav.flatMap((group) =>
    group.href ? [{ label: group.label, href: group.href }] : group.children ?? []
  );

  return (
    <footer className="border-t border-border-subtle py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo variant="wordmark" height={22} />
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="col-span-2 sm:col-span-3">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="bb-hairline mt-12 mb-6" />

        <p className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
