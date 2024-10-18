import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { ComponentProps } from 'react';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['tr'],

  // Used when no locale matches
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/problems': {
      tr: '/alistirmalar-2',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);

export type LinkProps = ComponentProps<typeof Link>;