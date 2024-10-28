import { redirect } from '@/i18n/routing';
import { trainings } from './[training]/contants';

export default function Home() {
  redirect(`/trainings/${trainings[0].sub[0].key}`);
}
