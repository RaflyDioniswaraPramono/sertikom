import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import {
  About,
  AddLetterCategory,
  EditLetterCategory,
  Dashboard,
  Letter,
  LetterCategory,
  LetterPreview,
  LetterUpload,
  LetterEdit,
} from "../pages";
import { LoadingSpin } from "../components";
import { api } from "../utilities/api";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Dashboard />}>
        <Route path="surat" element={<Letter />} />
        <Route path="surat/unggah" element={<LetterUpload />} />
        <Route path="surat/lihat/:id" element={<LetterPreview />} />
        <Route
          path="surat/edit/:id"
          element={<LetterEdit />}
          loader={async ({ params }) => {
            const data = await api.get(`/surat/${params.id}`);

            return data.data;
          }}
        />
        <Route path="kategori" element={<LetterCategory />} />
        <Route path="kategori/tambah" element={<AddLetterCategory />} />
        <Route
          path="kategori/edit/:id"
          element={<EditLetterCategory />}
          loader={async ({ params }) => {
            const data = await api.get(`/category/${params.id}`);

            return data.data;
          }}
        />
        <Route path="about" element={<About />} />
      </Route>
    )
  );

  return <RouterProvider router={router} fallbackElement={<LoadingSpin />} />;
};

export default Routes;
