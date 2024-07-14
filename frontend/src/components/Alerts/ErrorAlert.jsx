import { Bounce, toast, ToastContainer } from "react-toastify";
import { errorAlertState } from "../../states/alertState";
import { useEffect } from "react";

const ErrorAlert = () => {
  const { errorMessage, isErrorAlertOpen, closeErrorAlert } = errorAlertState();

  useEffect(() => {
    if (isErrorAlertOpen === true) {
      toast.error(
        <p
          className="ml-5 text-sm tracking-wider leading-snug text-zinc-300"
          dangerouslySetInnerHTML={{ __html: errorMessage }}></p>,

        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: true,
          theme: "dark",
          transition: Bounce,
          onClose: () => {
            closeErrorAlert();
          },
        }
      );
    }
  }, [closeErrorAlert, errorMessage, isErrorAlertOpen]);

  return <ToastContainer />;
};

export default ErrorAlert;
