import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Header from "./Header/Header";
//import HomePage from "./HomePage"; // Import your Home page component
import LoginPage from "./LogInPage/LoginPage"; // Import your Login page component
import HomePage from "./HomePage/HomePage";
import RegisterPage from "./RegisterPage/RegisterPage";
import PartDetailsPage from "./PartsDetailsPage/PartDetailsPage";
import PartsPage from "./PcParts/PartsPage";
import PartCategories from "./PcPartCategories/PcPartCategories";
import PcPrebuilds from "./PcPrebuilds/PcPrebuilds";
import PrebuildsDetails from "./PrebuildsDetails/PrebuildsDetails";
import AddPartCategoryPage from "./AddPartCategory/AddPartCategory";
import EditPartCategoryPage from "./EditPartCategory/EditPartCategory";
import AddPartPage from "./AddPartPage/AddPartPage";
import EditPartPage from "./EditPartPage/EditPartPage";
import AddPrebuildPage from "./AddPrebuild/AddPrebuild";
import EditPrebuildPage from "./EditPrebuild/EditPrebuild";
import AddPartToPrebuildPage from "./AddPartPrebuild/AddPartPrebuild";
const App = () => {
  return (
    <Router>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/partCategories" element={<PartCategories />} />
            <Route path="/partCategories/:id/Parts" element={<PartsPage />} />
            <Route path="/partCategories/:id/Parts/:partID" element={<PartDetailsPage />} />
            <Route path="/prebuilds" element={<PcPrebuilds />} />
            <Route path="/prebuildsDetails/:prebuildID" element={<PrebuildsDetails />} />
            <Route path="/partCategories/add" element={<AddPartCategoryPage />} />
            <Route path="/partCategories/edit/:categoryId" element={<EditPartCategoryPage />} />
            <Route path="/partCategories/:categoryId/addPart" element={<AddPartPage />} />
            <Route path="/partCategories/:categoryId/Parts/:partId/edit" element={<EditPartPage />} />
            <Route path="/prebuilds/addPrebuild" element={<AddPrebuildPage />} />
            <Route path="/prebuilds/:prebuildID/edit" element={<EditPrebuildPage />} />
            <Route path="/prebuilds/:prebuildId/AddPart" element={<AddPartToPrebuildPage />} />
          </Routes>
    </Router>
  );
};

export default App;