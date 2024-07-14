import { NavLink } from "react-router-dom";
import { Header, LoadingSpin } from "../../components";
import {
  ArrowRightOutlined,
  DeleteFilled,
  DownloadOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { confirmAlertState, successAlertState } from "../../states/alertState";
import { saveAs } from "file-saver";
import { date, time } from "../../utilities/date-time";

const Letter = () => {
  const [letterData, setLetterData] = useState(null);
  const [keyword, setKeyword] = useState("");

  const { fetch, isLoading } = useFetch();

  const { openSuccessAlert } = successAlertState();
  const { openConfirmAlert, closeConfirmAlert } = confirmAlertState();

  const fetchLetterData = useCallback((response) => {
    if (response.success === true) {
      setLetterData(response);
    }
  }, []);

  useEffect(() => {
    fetch({
      url: "/surat",
      method: "GET",
      cb: fetchLetterData,
    });
  }, []);

  const searchLetterDataCallback = useCallback((response) => {
    if (response.success === true) {
      setLetterData(response);
    } else {
      setLetterData(response);
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    if (keyword !== "") {
      fetch({
        url: `/surat/search/${keyword}`,
        method: "GET",
        cb: searchLetterDataCallback,
      });
    } else {
      fetch({
        url: "/surat",
        method: "GET",
        cb: fetchLetterData,
      });
    }
  };

  const refetchLetterCallback = useCallback((response) => {
    if (response.success === true) {
      setLetterData(response);
    }
  }, []);

  const deleteLetterCallback = useCallback(
    (response) => {
      if (response.success === true) {
        fetch({
          url: "/surat",
          method: "GET",
          cb: refetchLetterCallback,
        });

        openSuccessAlert(response.message);
      }
    },
    [fetch, openSuccessAlert, refetchLetterCallback]
  );

  const handleDelete = (values) => {
    openConfirmAlert({
      confirmTitle: "Hapus Arsip Surat",
      confirmText: `Apakah anda yakin ingin menghapus data arsip surat <b>${values.title}</b>?`,
      okAction: () => {
        fetch({
          url: `/surat/${values.id}`,
          method: "DELETE",
          cb: deleteLetterCallback,
        });

        closeConfirmAlert();
      },
    });
  };

  const handleDownload = async (surats) => {
    const fileURL = `http://localhost:3173/${surats.file_path}`;
    saveAs(fileURL, `${surats.letter_number}-${surats.title}.pdf`);
  };

  return (
    <div className="pr-4">
      {isLoading && <LoadingSpin />}
      <Header
        title="Arsip Surat"
        description='Berikut ini adalah surat-surat yang telah terbit dan diarsipkan. Klik "Lihat" pada kolom aksi untuk menampilkan surat.'
      />
      <div className="bg-white p-4 rounded-md shadow-md max-h-[32.8rem] overflow-y-auto">
        <div className="text-center mb-2">
          <p className="text-md font-medium tracking-wide">Tabel Arsip Surat</p>
          <p className="text-sm text-zinc-500 tracking-wide">Kantor Desa Karangduren</p>
        </div>
        <div className="mb-8 flex justify-center">
          <form onSubmit={handleSearch} className="relative w-1/2">
            <input
              type="text"
              name="keyword"
              autoComplete="off"              
              placeholder="cari surat ..."
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              className="focus:outline-none focus:shadow-md transition-shadow duration-150 hover:shadow-md text-xs p-3 leading-none border border-zinc-300 rounded-md w-full"
            />
            <button
              type="submit"
              className="w-8 h-8 bg-[#232932] absolute right-1 top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center">
              <SearchOutlined style={{ fontSize: "1.1rem", color: "white" }} />
            </button>
          </form>
        </div>

        <table className="mb-6 w-full overflow-y-auto">
          <thead>
            <tr>
              <th className="p-2 text-start border border-zinc-300 text-sm font-semibold tracking-wide w-[13%]">
                Nomor Surat
              </th>
              <th className="p-2 text-start border border-zinc-300 text-sm font-semibold tracking-wide w-[12%]">
                Kategori
              </th>
              <th className="p-2 text-start border border-zinc-300 text-sm font-semibold tracking-wide w-[30%]">
                Judul
              </th>
              <th className="p-2 text-center border border-zinc-300 text-sm font-semibold tracking-wide w-[20%]">
                Waktu Pengarsipan
              </th>
              <th className="p-2 text-center border border-zinc-300 text-sm font-semibold tracking-wide w-[25%]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {letterData?.data?.length > 0 ? (
              letterData?.data?.map((letters) => {
                const { id, LetterCategory, letter_number, title, upload_time } = letters;

                const regex = new RegExp(`(${keyword})`, "gi");
                const searchedCategory = LetterCategory.category_name.replace(
                  regex,
                  (match) => `<td><b>${match}</b></td>`
                );
                const searchedTitle = title.replace(regex, (match) => `<td><b>${match}</b></td>`);

                return (
                  <tr key={id}>
                    <td className="p-2 text-start border border-zinc-300 text-sm tracking-wide w-fit">
                      {letter_number}
                    </td>
                    <td
                      className="p-2 text-start border border-zinc-300 text-sm tracking-wide w-fit"
                      dangerouslySetInnerHTML={{ __html: searchedCategory }}></td>
                    <td
                      className="p-2 text-start border border-zinc-300 text-sm tracking-wide w-fit"
                      dangerouslySetInnerHTML={{ __html: searchedTitle }}></td>
                    <td className="p-2 text-center border border-zinc-300 text-sm tracking-wide w-fit">
                      <p>{date(upload_time)}</p>
                      <p className="text-xs text-zinc-500">{time(upload_time)} wib</p>
                    </td>
                    <td className="p-2 text-start border border-zinc-300 tracking-wide w-fit text-xs">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => handleDelete(letters)}
                          className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-red-400 hover:bg-red-500 transition-colors duration-150 text-white">
                          <DeleteFilled />
                          Hapus
                        </button>
                        <button
                          onClick={() => handleDownload(letters)}
                          className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-indigo-400 hover:bg-indigo-500 transition-colors duration-150 text-white">
                          <DownloadOutlined />
                          Unduh
                        </button>
                        <NavLink
                          to={`/surat/lihat/${id}`}
                          className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-secondary hover:bg-secondary-hover transition-colors duration-150 text-white">
                          Lihat
                          <ArrowRightOutlined />
                        </NavLink>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-2 text-center border border-zinc-300 text-sm tracking-wide w-fit"
                  dangerouslySetInnerHTML={{ __html: letterData?.message }}></td>
              </tr>
            )}
          </tbody>
        </table>

        <NavLink
          to="/surat/unggah"
          className="w-fit flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-zinc-700 hover:bg-zinc-800 transition-colors duration-150 text-white text-xs">
          <PlusCircleFilled />
          Arsipkan Surat
        </NavLink>
      </div>
    </div>
  );
};

export default Letter;
