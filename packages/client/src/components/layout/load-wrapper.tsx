import { Suspense, type JSX } from 'react';

const Load = (Component: JSX.Element) => (
   <Suspense fallback={<div>Loading...</div>}>{Component}</Suspense>
);

export default Load;
