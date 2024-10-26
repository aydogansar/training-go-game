import { PropsWithChildren } from 'react';

function Container({ children }: PropsWithChildren) {
  return <div className="container mx-auto">{children}</div>;
}
export default Container;
