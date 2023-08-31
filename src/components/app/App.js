import AppHeader from "../appHeader/AppHeader";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import Page404 from "../pages/Page404";
import SingleComicPage from "../pages/SingleComicPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="comics" element={<ComicsPage />}>
            <Route path=":comicId" element={<SingleComicPage />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
