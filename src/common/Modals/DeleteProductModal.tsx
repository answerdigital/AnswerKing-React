import { Button } from 'common/Buttons/Button';
import { ModalTransition } from 'common/Transitions/ModalTransition';
import { ReactElement } from 'react';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

export const DeleteProductModal = ({ setIsOpen, onConfirm }: Props): ReactElement => {
  return (
    <div
      data-testid="delete-product-modal"
      className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-75 shadow-sm"
    >
      <ModalTransition>
        <div className="flex h-[21vh] w-[35vh] flex-col justify-between rounded-2xl bg-white p-4 text-center">
          <h2 className="mb-1 text-xl font-semibold">Are you sure?</h2>
          <p data-testid="are-you-sure" className="mb-4 text-sm font-normal">
            Do you want to permanently <br /> delete this item?
          </p>
          <div className="flex justify-center">
            <Button data-testid="delete-cancel" colour="white" className="mr-4 h-[45px] w-[129.5px] text-sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button data-testid="delete-yes" colour="yellow" className="h-[45px] w-[129.5px] text-sm" onClick={() => onConfirm()}>
              Yes
            </Button>
          </div>
        </div>
      </ModalTransition>
    </div>
  );
};
