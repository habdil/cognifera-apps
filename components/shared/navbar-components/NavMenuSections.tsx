"use client";

import {
  Menu,
  MenuItem,
  HoveredLink,
  SecondaryMenuProvider,
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
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/services/feradata">FERADATA</HoveredLink>
          <HoveredLink href="/services/feraguide">FERAGUIDE</HoveredLink>
          <HoveredLink href="/services/ferapub">FERAPUB</HoveredLink>
          <HoveredLink href="/services/feragrant">FERAGRANT</HoveredLink>
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Publications">
        <SecondaryMenuProvider>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/publications">All Publications</HoveredLink>
            <HoveredLink href="/publications?section=books">
              Books
            </HoveredLink>
            <HoveredLink
              href="/publications"
              subItems={[
                { title: "Global Journal of Science Education", href: "/journal", description: "International journal focused on science education research and methodology" },
                { title: "Journal of Social Responsibility and Service", href: "/journal-social", description: "Community service and social responsibility research publications" },
                { title: "Journal Al-Musannif", href: "https://ojs.cognifera.web.id", description: "Islamic studies and scholarly research journal" }
              ]}
            >
              Journals
            </HoveredLink>
          </div>
        </SecondaryMenuProvider>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="News">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/news">All News</HoveredLink>
          <HoveredLink href="/news?category=industry">Industry News</HoveredLink>
          <HoveredLink href="/news?category=research">Research News</HoveredLink>
          <HoveredLink href="/news?category=company">Company News</HoveredLink>
        </div>
      </MenuItem>
    </Menu>
  );
};