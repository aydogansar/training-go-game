import { Link as IntlLink, LinkProps } from '@/i18n/routing';

function Link({ ...props }: LinkProps) {
  return <IntlLink {...props} />;
}
export default Link;
