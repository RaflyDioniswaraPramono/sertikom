import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoadingSpin, Subheader } from "../../components";
import { BackwardFilled, SaveFilled } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { addLetterCategoryValidation } from "../../middlewares/formValidations";
import { useFetch } from "../../hooks/useFetch";
import { useCallback, useState } from "react";
import { confirmAlertState, errorAlertState, successAlertState } from "../../states/alertState";

const AddLetterCategory = () => {
  const [count, setCount] = useState(0);

  const initialValues = {
    categoryName: "",
    description: "",
  };

  const { fetch, isLoading } = useFetch();
  const { openSuccessAlert } = successAlertState();
  const { openErrorAlert } = errorAlertState();
  const { openConfirmAlert, closeConfirmAlert } = confirmAlertState();

  const addLetterCategoryCallback = useCallback(
    (actions) => (response) => {
      if (response.success === true) {
        openSuccessAlert(response.message);
        closeConfirmAlert();
        actions.resetForm();        
      } else {
        openErrorAlert(response.message);
        actions.setFieldError("categoryName", response.message);
        closeConfirmAlert();
      }
    },
    [closeConfirmAlert, openErrorAlert, openSuccessAlert]
  );

  const handleSubmit = (values, actions) => {
    openConfirmAlert({
      confirmTitle: "Tambah Kategori Surat",
      confirmText: "Apakah anda yakin ingin menambah kategori surat tersebut?",
      isLoading: isLoading,
      okAction: () => {
        fetch({
          url: "/category",
          method: "POST",
          data: {
            categoryName: values.categoryName,
            description: values.description,
          },
          cb: addLetterCategoryCallback(actions),
        });
      },
    });
  };

  return (
    <div className="pr-4">
      <div className="mb-4">
        <Subheader
          title="Kategori Surat"
          prevTitleTo="/kategori"
          nextTitle="Tambah Kategori Surat"
          nextTitleTo="/kategori/tambah"
          description='Tambahkan atau edit data kategori. Jika sudah selesai, jangan lupa untuk mengeklik tombol "Simpan".'
        />
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="text-center mb-6">
          <p className="text-md font-medium tracking-wide">Formulir Tambah Kategori Surat</p>
          <p className="text-sm text-zinc-500 tracking-wide">Kantor Desa Karangduren</p>
        </div>

        <Formik initialValues={initialValues} validate={addLetterCategoryValidation} onSubmit={handleSubmit}>
          {({ isValid, setFieldValue, errors }) => {
            const onChange = (event) => {
              const countingChar = event.target.value.length;
              setCount(countingChar);
              setFieldValue("description", event.target.value, true);
            };

            return (
              <Form className="flex flex-col">
                <div className="grid grid-cols-7 mb-1 items-center">
                  <div className="col-span-1 text-sm text-zinc-500">Nama Kategori</div>
                  <div className="col-span-6">
                    <Field
                      type="text"
                      name="categoryName"
                      autoComplete="off"
                      autoFocus
                      required
                      className={`${
                        errors.categoryName ? "border border-red-500" : "border border-zinc-300 "
                      } w-1/3 focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-none rounded-md`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-4 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-6 text-xs text-red-600">
                    <ErrorMessage name="categoryName">
                      {(msg) => <p dangerouslySetInnerHTML={{ __html: msg }}></p>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-1 items-center">
                  <div className="col-span-1 text-sm text-zinc-500">Judul</div>
                  <div className="col-span-6 relative">
                    <Field
                      as="textarea"
                      rows="12"
                      name="description"
                      autoComplete="off"
                      required
                      onChange={onChange}
                      className={`${
                        errors.description ? "border border-red-500" : "border border-zinc-300 "
                      } w-1/2 resize-none focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-1 rounded-md`}
                    />
                    <div className="absolute left-[27.5rem] bottom-4">
                      <p className={`text-xs ${count > 150 || count < 10 ? "text-red-500" : "text-zinc-500"}`}>
                        {count} <span className="text-zinc-500">/ 150</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-4 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-6 flex justify-between items-center">
                    <ErrorMessage name="description">
                      {(msg) => <p className="text-xs text-red-600">{msg}</p>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="grid grid-cols-7">
                  <div className="col-span-1"></div>
                  <div className="col-span-6">
                    <div className="flex justify-start items-center gap-5">
                      <NavLink
                        to="/kategori"
                        className="text-xs w-fit flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-zinc-700 hover:bg-zinc-800 transition-colors duration-150 text-white">
                        <BackwardFilled />
                        Kembali
                      </NavLink>
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="disabled:bg-zinc-500 disabled:text-zinc-200 text-xs w-fit flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-indigo-400 hover:bg-indigo-500 transition-colors duration-150 text-white">
                        <SaveFilled />
                        {isLoading ? <LoadingSpin /> : "Simpan"}
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddLetterCategory;
