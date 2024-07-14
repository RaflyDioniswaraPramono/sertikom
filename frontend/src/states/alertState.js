import { create } from "zustand";

export const successAlertState = create((set) => ({
  successMessage: "",
  isSuccessAlertOpen: false,
  openSuccessAlert: (successMessage) =>
    set({
      successMessage: successMessage,
      isSuccessAlertOpen: true,
    }),
  closeSuccessAlert: () =>
    set({
      isSuccessAlertOpen: false,
    }),
}));

export const errorAlertState = create((set) => ({
  errorMessage: "",
  isErrorAlertOpen: false,
  openErrorAlert: (errorMessage) =>
    set({
      errorMessage: errorMessage,
      isErrorAlertOpen: true,
    }),
  closeErrorAlert: () =>
    set({
      isErrorAlertOpen: false,
    }),
}));

export const confirmAlertState = create((set) => ({
  confirmTitle: "",
  confirmText: "",
  okAction: null,
  isConfirmAlertOpen: false,
  openConfirmAlert: ({ confirmTitle: confirmTitle = "", confirmText: confirmText = "", okAction: okAction = null }) =>
    set({
      confirmTitle: confirmTitle,
      confirmText: confirmText,
      okAction: okAction,
      isConfirmAlertOpen: true,
    }),
  closeConfirmAlert: () =>
    set({
      isLoading: false,
      isConfirmAlertOpen: false,
    }),
}));
