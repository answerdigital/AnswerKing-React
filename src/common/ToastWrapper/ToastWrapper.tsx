import { ReactElement } from 'react';
import './ToastWrapper.scss';
import { Slide, ToastContainer } from 'react-toastify';

export default function ToastWrapper(): ReactElement {
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
}
