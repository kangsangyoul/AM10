import { FaChartBar, FaRobot, FaEye, FaBell, FaFileAlt, FaCog } from 'react-icons/fa';
import Dashboard from '../pages/Dashboard';
import AIModels from '../pages/AIModels';
import RiskInsights from '../pages/RiskInsights';
import Alerts from '../pages/Alerts';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

const routes = [
  { path: '/', label: 'Dashboard', element: Dashboard, icon: FaChartBar },
  { path: '/ai-models', label: 'AI Models', element: AIModels, icon: FaRobot },
  { path: '/risk-insights', label: 'Risk Insights', element: RiskInsights, icon: FaEye },
  { path: '/alerts', label: 'Alerts', element: Alerts, icon: FaBell },
  { path: '/reports', label: 'Reports', element: Reports, icon: FaFileAlt },
  { path: '/settings', label: 'Settings', element: Settings, icon: FaCog },
];

export default routes;
