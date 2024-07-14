import { Modal } from "antd";
import { confirmAlertState } from "../../states/alertState";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const ConfirmAlert = () => {
  const { confirmTitle, confirmText, okAction, isConfirmAlertOpen, closeConfirmAlert } = confirmAlertState();

  return (
    <Modal
      title={confirmTitle}
      centered
      destroyOnClose
      style={{ fontFamily: "Poppins" }}
      open={isConfirmAlertOpen}
      onCancel={() => closeConfirmAlert()}
      footer={null}
      width={500}>
      <div className="mt-2">
        <p className="text-sm text-zinc-600 mb-4" dangerouslySetInnerHTML={{ __html: confirmText }}></p>

        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => okAction()}
            className="w-fit flex justify-center items-center gap-2 py-3 px-5 rounded-sm leading-none bg-indigo-400 hover:bg-indigo-500 transition-colors duration-150 text-white">
            <CheckCircleFilled />
            OK
          </button>
          <button
            onClick={() => closeConfirmAlert()}
            className="w-fit flex justify-center items-center gap-2 py-3 px-5 rounded-sm leading-none bg-red-400 hover:bg-red-500 transition-colors duration-150 text-white">
            <CloseCircleFilled />
            Tidak
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmAlert;
