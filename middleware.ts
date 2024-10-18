// middleware.ts
import { chain } from '@/middlewares/chain';
import nextIntl from '@/middlewares/nextIntl';

export default chain([nextIntl]);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
