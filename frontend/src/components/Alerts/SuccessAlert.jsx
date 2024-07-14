import { useEffect } from "react";
import { successAlertState } from "../../states/alertState";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessAlert = () => {
  const { successMessage, isSuccessAlertOpen, closeSuccessAlert } = successAlertState();

  useEffect(() => {
    if (isSuccessAlertOpen === true) {
      toast.success(
        <p
          className="ml-5 text-sm tracking-wider leading-snug text-zinc-300"
          dangerouslySetInnerHTML={{ __html: successMessage }}></p>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: true,
          theme: "dark",
          transition: Bounce,
          onClose: () => {
            closeSuccessAlert();
          },
        }
      );
    }
  }, [closeSuccessAlert, isSuccessAlertOpen, successMessage]);

  return <ToastContainer />;
};

export default SuccessAlert;
