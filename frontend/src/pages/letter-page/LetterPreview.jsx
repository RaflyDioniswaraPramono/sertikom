import { NavLink, useParams } from "react-router-dom";
import { Subheader } from "../../components";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ArrowLeftOutlined, ArrowRightOutlined, DownloadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { date, time } from "../../utilities/date-time";

const LetterPreview = () => {
  const { id } = useParams();

  const [letterData, setLetterData] = useState({});

  const { fetch } = useFetch();

  const fetchLetterByIdCallback = useCallback((response) => {
    if (response.success === true) {
      console.log(response);
      setLetterData(response.data);
    }
  }, []);

  useEffect(() => {
    fetch({
      url: `/surat/${id}`,
      method: "GET",
      cb: fetchLetterByIdCallback,
    });
  }, []);

  const handleDownload = async () => {    
    const fileURL = `http://localhost:3173/${letterData.file_path}`;
    saveAs(fileURL, `${letterData.letter_number}-${letterData.title}.pdf`);
  };

  return (
    <div className="pr-4">
      <div className="mb-4">
        <Subheader
          title="Arsip Surat"
          prevTitleTo="/surat"
          nextTitle="Lihat Arsip Surat"
          nextTitleTo={`/surat/lihat/${id}`}
        />
      </div>
      <div className="bg-white p-4 rounded-md shadow-md grid grid-cols-7 gap-4">
        <div className="col-span-3">
          <p className="text-md font-semibold mb-2">Detail Data Arsip Surat</p>
          <div className="mb-1">
            <div className="grid grid-cols-7 items-center">
              <div className="col-span-2 text-sm">Nomor</div>
              <div className="col-span-5 text-sm">: {letterData.letter_number}</div>
            </div>
          </div>
          <div className="mb-1">
            <div className="grid grid-cols-7 items-center">
              <div className="col-span-2 text-sm">Kategori</div>
              <div className="col-span-5 text-sm">: {letterData.LetterCategory?.category_name}</div>
            </div>
          </div>
          <div className="mb-1">
            <div className="grid grid-cols-7 items-center">
              <div className="col-span-2 text-sm">Judul</div>
              <div className="col-span-5 text-sm">: {letterData.title}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-7 items-center">
              <div className="col-span-2 text-sm">Waktu Unggah</div>
              <div className="col-span-5 text-sm">
                :{" "}
                {date(letterData?.upload_time)} - {time(letterData?.upload_time)} wib
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-5">
            <div className="col-span-2 text-xs">
              <NavLink
                to="/surat"
                className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-zinc-700 hover:bg-zinc-800 transition-colors duration-150 text-white">
                <ArrowLeftOutlined />
                Kembali
              </NavLink>
            </div>
            <div className="col-span-2 text-xs">
              <button
                onClick={() => handleDownload(letterData.id)}
                className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-indigo-400 hover:bg-indigo-500 transition-colors duration-150 text-white">
                <DownloadOutlined />
                Unduh
              </button>
            </div>
            <div className="col-span-2 text-xs">
              <NavLink
                to={`/surat/edit/${id}`}
                className="w-full flex justify-center items-center gap-2 py-3 px-5 rounded-md leading-none bg-secondary hover:bg-secondary-hover transition-colors duration-150 text-white">
                Ganti File
                <ArrowRightOutlined />
              </NavLink>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <iframe
            title="Preview Surat"
            src={`http://localhost:3173/${letterData.file_path}`}
            className="w-full h-[30rem]"></iframe>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;
