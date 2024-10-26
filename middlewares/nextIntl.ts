import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { CustomMiddleware } from './chain';
import { NextFetchEvent, NextRequest } from 'next/server';

const handleIntlRouting = createMiddleware(routing);

function nextIntl(middleware: CustomMiddleware): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = handleIntlRouting(request);

    return middleware(request, event, response);
  };
}
export default nextIntl;
