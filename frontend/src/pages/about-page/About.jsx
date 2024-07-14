import { profile } from "../../assets";
import { Header } from "../../components";

const About = () => {
  return (
    <div className="pr-4">
      <Header
        title="Tentang"
        description="Aplikasi ini dibuat berdasarkan soal yang diberikan untuk Sertifikasi Kempetensi DIPA 2024 - DIII Teknologi Informasi."
      />
      <div className="mt-4 rounded-md grid grid-cols-4 items-start gap-4 relative">
        <div className="col-span-1">
          <img src={profile} alt="Profile Image Rafly" className="rounded-md w-full h-auto" />
        </div>
        <div className="col-span-3 p-2 bg-gradient-to-br z-[1] from-main to-gray-900 rounded-lg h-full">
          <div className="border-2 border-secondary h-full rounded-md p-10">
            <p className="px-6 py-2 text-xs text-zinc-300 border border-zinc-300 rounded-full w-fit mb-3">ABOUT ME</p>
            <h1 className="text-4xl font-extrabold tracking-wide text-white mb-4">
              Rafly Dioniswara <span className="text-secondary">Pramono</span>
            </h1>
            <div className="mb-2">
              <p className="text-md text-zinc-400">NIM</p>
              <p className="text-lg text-white font-semibold tracking-wide">2131740054</p>
            </div>
            <div className="mb-2">
              <p className="text-md text-zinc-400">Prodi</p>
              <p className="text-lg text-white font-semibold tracking-wide">DIII-Teknologi Informasi</p>
            </div>
            <div>
              <p className="text-md text-zinc-400">Tanggal</p>
              <p className="text-lg text-white font-semibold tracking-wide">
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <p className="absolute bottom-4 right-5 text-zinc-400 text-xs">Politeknik Negeri Malang PSDKU Lumajang</p>
        </div>
      </div>
    </div>
  );
};

export default About;
