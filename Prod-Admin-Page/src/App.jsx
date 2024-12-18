import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import existing pages
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

// Import new authentication components and provider
import { AuthProvider } from "./Auth/UseAuth";

// import SignUpPage from "./Pages/SignUpPage";
import PrivateRoute from "./components/PrivateRoute";
import AuthPage from "./Pages/LoginPage";

function App() {
  const [navConfig, setNavConfig] = useState(configData.navConfig);
  const [heroConfig, setHeroConfig] = useState(
    JSON.parse(localStorage.getItem("heroConfig") || "null") || configData.heroConfig
  );
  const [featureConfig, setFeatureConfig] = useState(configData.featureConfig);
  const [kpiConfig, setKpiConfig] = useState(
    JSON.parse(localStorage.getItem("kpiConfig") || "null") || configData.kpiConfig
  );
  const [videoConfig, setVideoConfig] = useState(
    JSON.parse(localStorage.getItem("videoConfig") || "null") || configData.videoConfig
  );
  const [trustConfig, setTrustConfig] = useState(
    JSON.parse(localStorage.getItem("trustConfig") || "null") || configData.trustConfig
  );
  const [articles, setArticles] = useState(
    JSON.parse(localStorage.getItem("articles") || "[]") || []
  );
  const [footerConfig, setFooterConfig] = useState(
    JSON.parse(localStorage.getItem("footerConfig") || "null") || configData?.footerConfig
  );
  const [ctaConfig, setCtaConfig] = useState(
    JSON.parse(localStorage.getItem("ctaConfig") || "null") || configData.ctaConfig
  );

  // LocalStorage Effects for Configs
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
      <AuthProvider>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<AuthPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} /> */}

          {/* Protected Admin Routes */}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <AdminHomePage />
              </PrivateRoute>
            } 
          />
          <Route
            path="/site/:id"
            element={
              <PrivateRoute>
                <AdminPage 
                  navConfig={navConfig} 
                  setNavConfig={setNavConfig} 
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/createsite"
            element={
              <PrivateRoute>
                <CreateSiteForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/listsite"
            element={
              <PrivateRoute>
                <SitesList />
              </PrivateRoute>
            }
          />

          {/* Update Configuration Routes */}
          <Route
            path="/admin/topnav/:id"
            element={
              <PrivateRoute>
                <NavUpdate config={navConfig} setConfig={setNavConfig} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/hero/:id"
            element={
              <PrivateRoute>
                <HeroUpdate 
                  heroConfig={heroConfig} 
                  setHeroConfig={setHeroConfig} 
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/feature/:id"
            element={
              <PrivateRoute>
                <FeatureUpdate
                  featureConfig={featureConfig}
                  setFeatureConfig={setFeatureConfig}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/kpi/:id"
            element={
              <PrivateRoute>
                <KpiUpdate 
                  kpiSection={kpiConfig} 
                  setKpiSection={setKpiConfig} 
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/video/:id"
            element={
              <PrivateRoute>
                <VideoSectionUpdate
                  videoConfig={videoConfig}
                  setVideoConfig={setVideoConfig}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/trust/:id"
            element={
              <PrivateRoute>
                <TrustUpdate 
                  trustConfig={trustConfig} 
                  setTrustConfig={setTrustConfig} 
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/article/:id"
            element={
              <PrivateRoute>
                <ArticlesUpdate 
                  articles={articles} 
                  setArticles={setArticles} 
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/footer/:id"
            element={
              <PrivateRoute>
                <FooterUpdate 
                  footerConfig={footerConfig} 
                  setFooterConfig={setFooterConfig} 
                />
              </PrivateRoute>
            }
          />
           <Route
            path="/admin/cta/:id"
            element={
              <PrivateRoute>
                <CtaUpdate 
                  ctaConfig={ctaConfig} 
                  setCtaConfig={setCtaConfig} 
                />
              </PrivateRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;