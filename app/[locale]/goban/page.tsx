import { Skeleton } from '@/components/ui/skeleton';

import dynamic from 'next/dynamic';

const GoDemo = dynamic(() => import('./GoApp'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[800px] aspect-square">
        <Skeleton className="h-full" />
      </div>
    </div>
  ),
});

export default function GobanPage() {
  return (
    <div>
      <GoDemo />
    </div>
  );
}
