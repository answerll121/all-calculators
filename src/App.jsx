import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const GeneralCalculator = lazy(() => import('./pages/GeneralCalculator'));
const UnitConverter = lazy(() => import('./pages/UnitConverter'));
const FinanceCalculator = lazy(() => import('./pages/FinanceCalculator'));
const HealthCalculator = lazy(() => import('./pages/HealthCalculator'));
const MathCalculator = lazy(() => import('./pages/MathCalculator'));
const LifestyleCalculator = lazy(() => import('./pages/LifestyleCalculator'));
const LottoPage = lazy(() => import('./pages/LottoPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="calculator" element={<GeneralCalculator />} />
            <Route path="unit" element={<UnitConverter />} />
            <Route path="lotto" element={<LottoPage />} />
            <Route path="finance" element={<FinanceCalculator />} />
            <Route path="health" element={<HealthCalculator />} />
            <Route path="math" element={<MathCalculator />} />
            <Route path="lifestyle" element={<LifestyleCalculator />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
