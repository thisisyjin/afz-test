import { Routes, Route } from "react-router-dom";

import RecommendMobile from "./components/common/RecommendMobile";
import Home from "./routes/Home";
import HospitalSearch from "./routes/HospitalSearch";
import SearchForm from "./routes/SearchForm";
import ImgUpload from "./routes/ImgUpload";
import UserInfoForm from "./routes/UserInfoForm";
import DataUploaded from "./routes/DataUploaded";

const App = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (!isMobile) {
    return <RecommendMobile />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<HospitalSearch />} />
        <Route path="/search/hospital" element={<SearchForm />} />
        <Route path="/upload" element={<ImgUpload />} />
        <Route path="/info" element={<UserInfoForm />} />
        <Route path="/info/save" element={<DataUploaded />} />
      </Routes>
    </>
  );
};

export default App;
