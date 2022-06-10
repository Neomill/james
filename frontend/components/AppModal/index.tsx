import { BsXCircle } from "react-icons/bs";
import Modal from "react-modal";

Modal.setAppElement("body");
type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tailwindHeight?: string;
};
const AppModal: React.FC<Props> = ({
  title,
  isOpen,
  onClose,
  children,
  tailwindHeight = "",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      overlayClassName="transition ease-in-out duration-200 py-10 bg-black bg-opacity-50 z-10  fixed top-0 left-0 w-full h-full"
      className={`outline-none ${tailwindHeight} transition ease-in-out duration-200 min-w-fit overflow-y-auto min-h-fit max-h-screen rounded-lg py-9 px-10 bg-white z-20 opacity-100 absolute  -translate-x-2/4 -translate-y-1/2  top-1/2 left-1/2`}
    >
      <div className="mb-4 flex justify-between items-center ">
        <h1 className="text-xl font-bold">{title}</h1>
        <BsXCircle
          size={18}
          className="cursor-pointer hover:text-red-600 text-red-500"
          onClick={onClose}
        />
      </div>
      {children}
    </Modal>
  );
};

export default AppModal;
