'use client';

import { cva } from 'class-variance-authority';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { trainings } from './contants';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Messages } from '@/declarations';
import { Link } from '@/i18n/routing';

const subItemVariants = cva('rounded-sm hover:bg-opacity-50 hover:bg-blue-500 focus:bg-opacity-50 focus:bg-blue-500 transition-all', {
  variants: {
    active: {
      true: 'bg-blue-500 hover:bg-opacity-100 focus:bg-opacity-100',
    },
  },
});

type TrainingContentMessages = keyof Messages['training-contents'];

function ContentSidebar({ active }: { active: string }) {
  const t = useTranslations('training-contents');

  return (
    <Sidebar className="pt-16 z-1">
      <SidebarHeader>{t('main-title')}</SidebarHeader>
      <SidebarContent className="list-none  px-2">
        {trainings.map(item => (
          <SidebarMenuItem key={item.key}>
            <SidebarGroupLabel>{t(`title-${item.key}` as TrainingContentMessages)}</SidebarGroupLabel>
            {item.sub.length > 0 && (
              <SidebarMenuSub>
                {item.sub.map(subItem => {
                  return (
                    <SidebarMenuSubItem key={subItem.key}>
                      <SidebarMenuSubButton
                        className={cn(subItemVariants({ active: active === subItem.key }))}
                        size="md"
                        asChild
                      >
                        <Link href={`/trainings/${subItem.key}`}>{t(subItem.key as TrainingContentMessages)}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
export default ContentSidebar;
