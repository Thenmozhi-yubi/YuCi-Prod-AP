import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminPage from "./Pages/AdminPage";
import NavUpdate from "./Pages/NavUpdate";
import HeroUpdate from "./Pages/HeroUpdate";
import FeatureUpdate from "./Pages/FeatureUpdate";
import KpiUpdate from "./Pages/KpiUpdate";
import VideoSectionUpdate from "./Pages/VideoSectionUpdate";
import TrustUpdate from "./Pages/TrustUpdate";
import ArticlesUpdate from "./Pages/ArticlesUpdate";
import FooterUpdate from "./Pages/FooterUpdate";
import configData from "./config";
import CtaUpdate from "./Pages/CtaUpdate";
import AdminHomePage from "./Pages/AdminHomePage";
import CreateSiteForm from "./Pages/CreateSiteForm";
import SitesList from "./Pages/SitesList";

function App() {
  const [navConfig, setNavConfig] = useState(configData.navConfig);
  const [heroConfig, setHeroConfig] = useState(
    JSON.parse(localStorage.getItem("heroConfig")) || configData.heroConfig
  );
  const [featureConfig, setFeatureConfig] = useState(configData.featureConfig);
  const [kpiConfig, setKpiConfig] = useState(
    JSON.parse(localStorage.getItem("kpiConfig")) || configData.kpiConfig
  );
  const [videoConfig, setVideoConfig] = useState(
    JSON.parse(localStorage.getItem("videoConfig")) || configData.videoConfig
  );
  const [trustConfig, setTrustConfig] = useState(
    JSON.parse(localStorage.getItem("trustConfig")) || configData.trustConfig
  );
  const [articles, setArticles] = useState(
    JSON.parse(localStorage.getItem("articles")) || []
  );
  const [footerConfig, setFooterConfig] = useState(
    JSON.parse(localStorage.getItem("footerConfig")) || configData.footerConfig
  );

  const [ctaConfig, setCtaConfig] = useState(
    JSON.parse(localStorage.getItem("ctaConfig")) || configData.ctaConfig
  )

  useEffect(() => {
    localStorage.setItem("heroConfig", JSON.stringify(heroConfig));
  }, [heroConfig]);

  useEffect(() => {
    localStorage.setItem("kpiConfig", JSON.stringify(kpiConfig));
  }, [kpiConfig]);

  useEffect(() => {
    localStorage.setItem("videoConfig", JSON.stringify(videoConfig));
  }, [videoConfig]);

  useEffect(() => {
    localStorage.setItem("trustConfig", JSON.stringify(trustConfig));
  }, [trustConfig]);

  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("footerConfig", JSON.stringify(footerConfig));
  }, [footerConfig]);
 
  useEffect(() => {
    localStorage.setItem("ctaConfig", JSON.stringify(ctaConfig));
  }, [ctaConfig]);

  return (
    <Router>
      <Routes>
        
        <Route
          path="/admin"
          element={<AdminPage navConfig={navConfig} setNavConfig={setNavConfig} />}
        />
        <Route
          path="/createsite"
          element={<CreateSiteForm />}
        />
         <Route
          path="/listsite"
          element={<SitesList />}
        />
        <Route
          path="/"
          element={<AdminHomePage  />}
        />
        <Route
          path="/admin/topnav"
          element={<NavUpdate config={navConfig} setConfig={setNavConfig} />}
        />
        <Route
          path="/admin/hero"
          element={<HeroUpdate heroConfig={heroConfig} setHeroConfig={setHeroConfig} />}
        />
        <Route
          path="/admin/feature"
          element={
            <FeatureUpdate
              featureConfig={featureConfig}
              setFeatureConfig={setFeatureConfig}
            />
          }
        />
        <Route
          path="/admin/kpi"
          element={<KpiUpdate kpiSection={kpiConfig} setKpiSection={setKpiConfig} />}
        />
        <Route
          path="/admin/video"
          element={
            <VideoSectionUpdate
              videoConfig={videoConfig}
              setVideoConfig={setVideoConfig}
            />
          }
        />
        <Route
          path="/admin/trust"
          element={
            <TrustUpdate trustConfig={trustConfig} setTrustConfig={setTrustConfig} />
          }
        />
        <Route
          path="/admin/article"
          element={<ArticlesUpdate articles={articles} setArticles={setArticles} />}
        />
        <Route
          path="/admin/footer"
          element={<FooterUpdate footerConfig={footerConfig} setFooterConfig={setFooterConfig} />}
        />
         <Route
          path="/admin/cta"
          element={<CtaUpdate ctaConfig={ctaConfig} setCtaConfig={setCtaConfig} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
