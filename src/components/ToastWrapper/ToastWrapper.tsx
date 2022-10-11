import './ToastWrapper.scss';
import React, { ReactElement } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

export const ToastWrapper = (): ReactElement => {
  return (
    <ToastContainer
      autoClose={2000}
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
