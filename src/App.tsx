/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import NewProjectForm from './NewProjectForm';
import ResultsDashboard from './ResultsDashboard';
import ReportView from './ReportView';
import PricingPage from './PricingPage';
import AboutPage from './AboutPage';
import { LoginPage, SignupPage } from './AuthPages';
import MarketplaceHome from './MarketplaceHome';
import MaterialListings from './MaterialListings';
import SupplierRequests from './SupplierRequests';
import EquipmentRentals from './EquipmentRentals';
import OrderManagement from './OrderManagement';
import EscrowWallet from './EscrowWallet';
import AIProcurementAdvisor from './AIProcurementAdvisor';
import FinancingEngine from './FinancingEngine';
import SmartCityEngine from './SmartCityEngine';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-project" element={<NewProjectForm />} />
        <Route path="/results/:id" element={<ResultsDashboard />} />
        <Route path="/report/:id" element={<ReportView />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Marketplace Routes */}
        <Route path="/marketplace" element={<MarketplaceHome />} />
        <Route path="/marketplace/materials" element={<MaterialListings />} />
        <Route path="/marketplace/requests" element={<SupplierRequests />} />
        <Route path="/marketplace/equipment" element={<EquipmentRentals />} />
        <Route path="/marketplace/orders" element={<OrderManagement />} />
        <Route path="/marketplace/escrow" element={<EscrowWallet />} />
        <Route path="/procurement-advisor" element={<AIProcurementAdvisor />} />
        <Route path="/financing" element={<FinancingEngine />} />
        <Route path="/smart-city" element={<SmartCityEngine />} />
        
        {/* Fallback routes for dashboard tabs */}
        <Route path="/projects" element={<Dashboard />} />
        <Route path="/reports" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
