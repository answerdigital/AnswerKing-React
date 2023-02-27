import { ReactElement } from 'react';
import PageTransition from 'common/Transitions/PageTransition';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function PageLayout({ title, children }: Props): ReactElement {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
