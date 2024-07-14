import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoadingSpin, Subheader } from "../../components";
import { BackwardFilled, SaveFilled } from "@ant-design/icons";
import { NavLink, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useCallback, useEffect, useState } from "react";
import { confirmAlertState, errorAlertState, successAlertState } from "../../states/alertState";
import { editLetterValidation } from "../../middlewares/formValidations";

const LetterEdit = () => {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState([]);

  const { data } = useLoaderData();

  const initialValues = {
    id: data.id,
    categoryId: data.category_id,
    letterNumber: data.letter_number,
    title: data.title,
    file: `http://localhost:3173/${data.file_path}`,
  };

  const { fetch, isLoading } = useFetch();
  const { openSuccessAlert } = successAlertState();
  const { openErrorAlert } = errorAlertState();
  const { openConfirmAlert, closeConfirmAlert } = confirmAlertState();

  const categoryDataCallback = useCallback((response) => {
    if (response.success === true) {
      setCategoryData(response.data);
    }
  }, []);

  useEffect(() => {
    fetch({
      url: "/category",
      method: "GET",
      cb: categoryDataCallback,
    });
  }, []);

  const editLetterCallback = useCallback(
    (actions) => (response) => {
      if (response.success === true) {
        openSuccessAlert(response.message);

        navigate(`/surat/lihat/${data.id}`);
      } else {
        openErrorAlert(response.message);
        actions.setFieldError(response.field, response.message);
      }
    },
    [data.id, navigate, openErrorAlert, openSuccessAlert]
  );

  const handleSubmit = (values, actions) => {
    openConfirmAlert({
      confirmTitle: "Edit Arsip Surat",
      confirmText: "Apakah anda yakin ingin mengedit data arsip surat tersebut?",
      okAction: () => {
        fetch({
          url: `/surat/${values.id}`,
          method: "PUT",
          data: values,
          cb: editLetterCallback(actions),
        });

        closeConfirmAlert();
      },
    });
  };

  return (
    <div className="pr-4">
      <div className="mb-4">
        <Subheader
          title="Arsip Surat"
          prevTitleTo="/surat"
          nextTitle="Unggah Surat"
          nextTitleTo="/surat/unggah"
          description="Unggah surat yang telah diterbit pada form ini untuk diarsipkan. Gunakan file berformat PDF."
        />
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="text-center mb-6">
          <p className="text-md font-medium tracking-wide">Formulir Arsipkan Surat</p>
          <p className="text-sm text-zinc-500 tracking-wide">Kantor Desa Karangduren</p>
        </div>

        <Formik initialValues={initialValues} validate={editLetterValidation} onSubmit={handleSubmit}>
          {({ isValid, setFieldValue, errors }) => {
            return (
              <Form encType="multipart/form-data" className="flex flex-col">
                <div className="grid grid-cols-7 mb-1 items-center">
                  <div className="col-span-1 text-sm text-zinc-500">Nomor Surat</div>
                  <div className="col-span-6">
                    <Field
                      type="text"
                      name="letterNumber"
                      autoComplete="off"
                      autoFocus
                      required
                      className={`${
                        errors.categoryName ? "border border-red-500" : "border border-zinc-300 "
                      } w-1/3 focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-none rounded-md`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-3 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-6 text-xs text-red-600">
                    <ErrorMessage name="letterNumber">
                      {(msg) => <p dangerouslySetInnerHTML={{ __html: msg }}></p>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-1 items-center">
                  <div className="col-span-1 text-sm text-zinc-500">Kategori</div>
                  <div className="col-span-6 relative w-1/3">
                    <Field
                      as="select"
                      name="categoryId"
                      onChange={(event) => {
                        setFieldValue("categoryId", event.target.value, true);
                      }}
                      autoComplete="off"
                      autoFocus
                      required
                      className={`${
                        errors.categoryName ? "border border-red-500" : "border border-zinc-300 "
                      } cursor-pointer w-full focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-none rounded-md`}>
                      {categoryData.map((categories) => {
                        const { id, category_name } = categories;

                        return (
                          <option key={id} value={id}>
                            {category_name}
                          </option>
                        );
                      })}
                    </Field>
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-3 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-6 text-xs text-red-600">
                    <ErrorMessage name="categoryId">
                      {(msg) => <p dangerouslySetInnerHTML={{ __html: msg }}></p>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-1 items-center">
                  <div className="col-span-1 text-sm text-zinc-500">Judul</div>
                  <div className="col-span-6">
                    <Field
                      type="text"
                      name="title"
                      autoComplete="off"
                      autoFocus
                      required
                      className={`${
                        errors.categoryName ? "border border-red-500" : "border border-zinc-300 "
                      } w-1/3 focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-none rounded-md`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-3 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-6 text-xs text-red-600">
                    <ErrorMessage name="title">
                      {(msg) => <p dangerouslySetInnerHTML={{ __html: msg }}></p>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-1 items-center">
                  <div className="col-span-1 text-sm text-zinc-500">File Surat (PDF)</div>
                  <div className="col-span-6 relative">
                    <Field
                      type="file"
                      name="file"
                      value={undefined}
                      autoComplete="off"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0], true);
                      }}
                      required
                      className={`${
                        errors.description ? "border border-red-500" : "border border-zinc-300 "
                      } w-1/2 resize-none focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-1 rounded-md`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-5 items-center">
                  <div className="col-span-1"></div>
                  <div className="col-span-6 flex justify-between items-center">
                    <ErrorMessage name="file">{(msg) => <p className="text-xs text-red-600">{msg}</p>}</ErrorMessage>
                  </div>
                </div>
                <div className="grid grid-cols-7">
                  <div className="col-span-1"></div>
                  <div className="col-span-6">
                    <div className="flex justify-start items-center gap-5">
                      <NavLink
                        to="/surat"
                        className="w-fit text-xs flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-zinc-700 hover:bg-zinc-800 transition-colors duration-150 text-white">
                        <BackwardFilled />
                        Kembali
                      </NavLink>
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="disabled:bg-zinc-500 disabled:text-zinc-200 w-fit text-xs flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-secondary hover:bg-secondary-hover transition-colors duration-150 text-white">
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

export default LetterEdit;
