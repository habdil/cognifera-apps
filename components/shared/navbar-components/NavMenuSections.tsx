"use client";

import {
  Menu,
  MenuItem,
  HoveredLink,
} from "@/components/ui/navbar-menu";

interface NavMenuSectionsProps {
  active: string | null;
  setActive: (item: string | null) => void;
}

export const NavMenuSections = ({ active, setActive }: NavMenuSectionsProps) => {
  return (
    <Menu setActive={setActive}>
      <MenuItem setActive={setActive} active={active} item="About">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/profile">Profile</HoveredLink>
          <HoveredLink href="/visi-misi">Visi dan Misi</HoveredLink>
          <HoveredLink href="/our-team">Our Team</HoveredLink>
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Services">
        <div className="flex flex-col space-y-3 text-sm">
          <HoveredLink href="/#layanan">
            <span className="font-semibold">All Services</span>
          </HoveredLink>

          <div className="border-t pt-3 mt-2 space-y-2">
            <HoveredLink href="/#layanan">
              <div className="flex flex-col">
                <span className="font-medium">FERADATA</span>
                <span className="text-xs text-muted-foreground">Premium Data Analysis</span>
              </div>
            </HoveredLink>
            <HoveredLink href="/#layanan">
              <div className="flex flex-col">
                <span className="font-medium">FERAGUIDE</span>
                <span className="text-xs text-muted-foreground">Academic Writing Guidance</span>
              </div>
            </HoveredLink>
            <HoveredLink href="/#layanan">
              <div className="flex flex-col">
                <span className="font-medium">FERAPUB</span>
                <span className="text-xs text-muted-foreground">International Journal Publication</span>
              </div>
            </HoveredLink>
            <HoveredLink href="/#layanan">
              <div className="flex flex-col">
                <span className="font-medium">FERAGRANT</span>
                <span className="text-xs text-muted-foreground">Research Grant & Funding</span>
              </div>
            </HoveredLink>
          </div>

          <div className="border-t pt-3">
            <HoveredLink href="/#layanan">
              <span className="font-medium">Book Publishing</span>
            </HoveredLink>
          </div>
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Publications">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/publications">Books</HoveredLink>
          <a
            href="https://journal.cognifera.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
          >
            Journals ↗
          </a>
        </div>
      </MenuItem>

      {/* <MenuItem setActive={setActive} active={active} item="News">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/news">All News</HoveredLink>
          <HoveredLink href="/news?category=industry">Industry News</HoveredLink>
          <HoveredLink href="/news?category=research">Research News</HoveredLink>
          <HoveredLink href="/news?category=company">Company News</HoveredLink>
        </div>
      </MenuItem> */}
    </Menu>
  );
};