import './ToastWrapper.scss';
import { ReactElement } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

export const ToastWrapper = (): ReactElement => {
  return (
    <ToastContainer
      autoClose={false}
      hideProgressBar
      newestOnTop
      position="bottom-right"
      progressClassName="answer_toast__progress"
      style={{ zIndex: 999999 }}
      toastClassName="answer_toast"
      transition={Slide}
    />
  );
};
