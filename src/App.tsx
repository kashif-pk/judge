import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

const VirtualCourtroomPage = lazy(
  () => import("./components/courtroom/VirtualCourtroomPage"),
);

const AboutPage = lazy(() => import("./components/about/AboutPage"));

const HowItWorksPage = lazy(
  () => import("./components/how-it-works/HowItWorksPage"),
);

const FAQPage = lazy(() => import("./components/faq/FAQPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courtroom" element={<VirtualCourtroomPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FAQPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
