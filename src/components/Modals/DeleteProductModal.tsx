import { Button } from 'components/Buttons/Button';
import { ModalTransition } from 'components/Transitions/ModalTransition';
import { ReactElement } from 'react';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

export const DeleteProductModal = ({ setIsOpen, onConfirm }: Props): ReactElement => {
  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-75 shadow-sm">
      <ModalTransition>
        <div className="flex h-[21vh] w-[35vh] flex-col justify-between rounded-2xl bg-white p-4 text-center">
          <h2 className="mb-1 text-[20px] font-[600] leading-[30px]">Are you sure?</h2>
          <p className="mb-4 text-[14px] font-[400] leading-[21px]">
            Do you want to permanently <br /> delete this item?
          </p>
          <div className="flex justify-center">
            <Button size="small" colour="white" className="mr-4 h-[45px] w-[129.5px] border-[1px]" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="small" colour="yellow" className="h-[45px] w-[129.5px]" onClick={() => onConfirm()}>
              Yes
            </Button>
          </div>
        </div>
      </ModalTransition>
    </div>
  );
};
