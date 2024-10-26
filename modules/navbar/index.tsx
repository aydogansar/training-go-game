import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import NavbarLink from './link';

function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="problems">
          <NavbarLink href="/">Dersler</NavbarLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="goban">
          <NavbarLink href="/goban">Go Tahtası</NavbarLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default Navbar;
