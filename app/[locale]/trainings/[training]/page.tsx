import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Sidebar from './sidebar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import pick from 'lodash.pick';
import PlayGround from './playground';

async function TrainingPage({ params }: { params: { training: string } }) {
  const messages = await getMessages();

  const training = params.training;

  return (
    <NextIntlClientProvider messages={pick(messages, 'training-contents')}>
      <SidebarProvider>
        <Sidebar active={training} />

        <main className="w-full">
          <SidebarTrigger className="sticky top-16" />

          <div className="w-full flex justify-center items-center">
            <PlayGround activeTraining={training} />
          </div>
        </main>
      </SidebarProvider>
    </NextIntlClientProvider>
  );
}
export default TrainingPage;
