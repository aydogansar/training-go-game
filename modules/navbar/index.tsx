import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import NavbarLink from './link';
import { useTranslations } from 'next-intl';



function Navbar() {
 const t = useTranslations('navigation');

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="problems">
          <NavbarLink href="/">{t('trainings')}</NavbarLink>
        </NavigationMenuItem>
        <NavigationMenuItem value="goban">
          <NavbarLink href="/goban">{t('goban')}</NavbarLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default Navbar;
