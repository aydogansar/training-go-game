import Link from '@/components/link';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { LinkProps } from '@/i18n/routing';

function NavbarLink({ children, ...props }: LinkProps) {
  return (
    <Link
      className={navigationMenuTriggerStyle()}
      {...props}
    >
      {children}
    </Link>
  );
}
export default NavbarLink;
