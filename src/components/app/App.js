import AppHeader from "../appHeader/AppHeader";
import SingleCharacterPage from "../pages/SingleCharacterPage";
import Spinner from "../spinner/spinner";

import { lazy, Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const Page404 = lazy(() => import("../pages/Page404"));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/MarvelMovies" element={<MainPage />} />
            <Route path="/MarvelMovies/:charId" element={<SingleCharacterPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
