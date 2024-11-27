import Layout from "./layout/Layout";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddPage from "./Pages/AddPage";
import PostPage from "./Pages/PostPage";
import NotFound from "./Pages/NotFound";


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element = {<Layout />}>
            <Route index element={<HomePage/>} />
            <Route path='/:id' element={<PostPage />} />
            <Route path='/add' element={<AddPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
