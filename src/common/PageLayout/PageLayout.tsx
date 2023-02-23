import { PageTransition } from 'common/Transitions/PageTransition';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const PageLayout = (props: Props): ReactElement => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <PageTransition>{props.children}</PageTransition>
    </>
  );
};
