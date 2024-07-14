import { DeleteFilled, EditFilled, PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Header, LoadingSpin } from "../../components";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { confirmAlertState, errorAlertState, successAlertState } from "../../states/alertState";

const LetterCategory = () => {
  const [letterCategoryData, setLetterCategoryData] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { fetch, isLoading } = useFetch();

  const { openSuccessAlert } = successAlertState();
  const { openErrorAlert } = errorAlertState();
  const { openConfirmAlert, closeConfirmAlert } = confirmAlertState();

  const fetchCategoryData = useCallback(
    (response) => {
      if (response.success === true) {
        setLetterCategoryData(response);
      }
    },
    [setLetterCategoryData]
  );

  useEffect(() => {
    fetch({
      url: "/category",
      method: "GET",
      cb: fetchCategoryData,
    });
  }, []);

  const searchLetterCategoryDataCallback = useCallback(
    (response) => {
      if (response.success === true) {
        setLetterCategoryData(response);
      } else {
        setLetterCategoryData(response);
      }
    },
    [setLetterCategoryData]
  );

  const handleSearch = (event) => {
    event.preventDefault();

    if (keyword !== "") {
      fetch({
        url: `/search/category/${keyword}`,
        method: "GET",
        cb: searchLetterCategoryDataCallback,
      });
    } else {
      fetch({
        url: "/category",
        method: "GET",
        cb: fetchCategoryData,
      });
    }
  };

  const refetchLetterCategoryCallback = useCallback(
    (response) => {
      if (response.success === true) {
        setLetterCategoryData(response);
      }
    },
    [setLetterCategoryData]
  );

  const deleteCategoryLetterCallback = useCallback(
    (response) => {
      if (response.success === true) {
        openSuccessAlert(response.message);

        fetch({
          url: "/category",
          method: "GET",
          cb: refetchLetterCategoryCallback,
        });
      } else {
        openErrorAlert(response.message);
      }
    },
    [fetch, openErrorAlert, openSuccessAlert, refetchLetterCategoryCallback]
  );

  const handleDelete = (values) => {
    openConfirmAlert({
      confirmTitle: "Hapus Kategori Surat",
      confirmText: `Apakah anda yakin ingin menghapus data kategori surat <b>${values.category_name}</b> tersebut!`,
      okAction: () => {
        fetch({
          url: `/category/${values.id}`,
          method: "DELETE",
          cb: deleteCategoryLetterCallback,
        });

        closeConfirmAlert();
      },
    });
  };

  return (
    <div className="pr-4 pb-4">
      {isLoading && <LoadingSpin />}
      <div className="mb-4 sticky top-0 z-10">
        <Header
          title="Kategori Surat"
          description='Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat. Klik "Tambah" pada kolom aksi untuk menambahkan kategori baru.'
        />
      </div>
      <div className="bg-white p-4 rounded-md shadow-md max-h-[32.8rem] overflow-y-auto">
        <div className="text-center mb-2">
          <p className="text-md font-medium tracking-wide">Tabel Kategori Surat</p>
          <p className="text-sm text-zinc-500 tracking-wide">Kantor Desa Karangduren</p>
        </div>
        <div className="mb-8 flex justify-center">
          <form onSubmit={handleSearch} className="relative w-1/2">
            <input
              type="text"
              name="keyword"
              autoComplete="off"
              placeholder="cari ..."
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              className="focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-none border border-zinc-300 rounded-md w-full"
            />
            <button
              type="submit"
              className="w-8 h-8 bg-main absolute right-1 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
              <SearchOutlined style={{ fontSize: "1.1rem", color: "white" }} />
            </button>
          </form>
        </div>

        <table className="mb-6 w-full overflow-y-auto">
          <thead>
            <tr>
              <th className="p-2 text-center border border-zinc-300 text-sm font-semibold tracking-wide w-[5%]">No</th>
              <th className="p-2 text-start border border-zinc-300 text-sm font-semibold tracking-wide w-[30%]">
                Nama Kategori
              </th>
              <th className="p-2 text-start border border-zinc-300 text-sm font-semibold tracking-wide w-[65%]">
                Keterangan
              </th>
              <th className="p-2 text-center border border-zinc-300 text-sm font-semibold tracking-wide w-[65%]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {letterCategoryData?.data?.length > 0 ? (
              letterCategoryData?.data?.map((categories, index) => {
                const { id, category_name, description } = categories;

                const regex = new RegExp(`(${keyword})`, "gi");
                const searchedCategoryName = category_name.replace(regex, (match) => `<td><b>${match}</b></td>`);

                return (
                  <tr key={id}>
                    <td className="p-2 text-center border border-zinc-300 text-sm tracking-wide w-fit">{index + 1}</td>
                    <td
                      className="p-2 text-start border border-zinc-300 text-sm tracking-wide w-fit"
                      dangerouslySetInnerHTML={{ __html: searchedCategoryName }}></td>
                    <td className="p-2 text-start border border-zinc-300 text-sm tracking-wide w-fit">{description}</td>
                    <td className="p-2 text-start border border-zinc-300 tracking-wide w-fit text-xs">
                      <div className="flex justify-center items-center gap-3">
                        <NavLink
                          to={`/kategori/edit/${id}`}
                          className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-indigo-400 hover:bg-indigo-500 transition-colors duration-150 text-white">
                          <EditFilled />
                          Edit
                        </NavLink>
                        <button
                          onClick={() => handleDelete(categories)}
                          className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-red-400 hover:bg-red-500 transition-colors duration-150 text-white">
                          <DeleteFilled />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-2 text-center border border-zinc-300 text-sm tracking-wide w-fit"
                  dangerouslySetInnerHTML={{ __html: letterCategoryData?.message }}></td>
              </tr>
            )}
          </tbody>
        </table>

        <NavLink
          to="/kategori/tambah"
          className="w-fit flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-zinc-700 hover:bg-zinc-800 transition-colors duration-150 text-white text-xs">
          <PlusCircleFilled />
          Tambah Kategori
        </NavLink>
      </div>
    </div>
  );
};

export default LetterCategory;
