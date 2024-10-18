import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { CustomMiddleware } from './chain';
import { NextFetchEvent, NextRequest } from 'next/server';

function nextIntl(middleware: CustomMiddleware): CustomMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = createMiddleware(routing);

    return middleware(request, event, response(request));
  };
}
export default nextIntl;
