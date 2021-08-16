// @material-ui/icons
import WidgetsIcon from '@material-ui/icons/Widgets';
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HealingIcon from '@material-ui/icons/Healing';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BarChartIcon from '@material-ui/icons/BarChart';
// core components/views for App layout
import ProfilePage from "../views/ProfilePage/Profile.js";
import DiseaseInfo from '../views/DiseaseInfo/DiseaseInfo.js';
import Logout from '../views/Logout/logout.js';
import CholeraPortal from '../views/Portals/Cholera.js';
import EbolaPortal from '../views/Portals/Ebola.js';
import MalariaPortal from '../views/Portals/Malaria.js';
import H1N1Portal from '../views/Portals/H1N1.js';
import Auth from '../views/Auth/AuthPage.js';
import HomePortal from '../views/Portals/HomePortal.js';
import CreateExperience from '../views/Experiences/CreateExperience.js';
import AllExperiences from '../views/Experiences/AllExperiences.js';
import ForumIcon from '@material-ui/icons/Forum';
import HIVPortal from '../views/Portals/HIVAIDS.js';
import CoronaPortal from '../views/Portals/Corona.js';
import HealthStats from '../views/HealthStats/HealthStats.js';
import { AppPageNotFound } from '../views/PageNotFound/404AppPageNotFound';

export const appRoutes = (props) => {

  var loggedIn = localStorage.getItem('profile');

  var portalsList = [
    { name: "COVID19", path: '/app/portal/corona' },
    { name: "Cholera", path: '/app/portal/cholera' },
    { name: "Malaria", path: '/app/portal/malaria' },
    { name: "H1N1", path: '/app/portal/h1n1' },
    { name: "Ebola", path: '/app/portal/ebola' },
    { name: "HIV/AIDS", path: '/app/portal/hiv' },
  ];

  return ([

    {
      path: "/portals",
      name: "Portals",
      icon: WidgetsIcon,
      component: HomePortal,
      layout: "/app",
      showInDrawer: true,
      listItems: portalsList,
    },
    {
      path: "/diseases",
      name: "Diseases",
      icon: HealingIcon,
      component: DiseaseInfo,
      layout: "/app",
      showInDrawer: true,
    },
    {
      path: "/forum",
      name: "Forum",
      icon: ForumIcon,
      component: AllExperiences,
      layout: "/app",
      showInDrawer: true,
    },
    {
      path: "/health",
      name: "Health Stats",
      icon: BarChartIcon,
      component: HealthStats,
      layout: "/app",
      showInDrawer: true,
    },

    // Individual Epidemic Portals
    {
      path: "/portal/corona",
      name: "Corona",
      icon: Person,
      component: CoronaPortal,
      layout: "/app",
      showInDrawer: false,
    },
    {
      path: "/portal/ebola",
      name: "Ebola",
      icon: Person,
      component: EbolaPortal,
      layout: "/app",
      showInDrawer: false,
    },
    {
      path: "/portal/malaria",
      name: "Malaria",
      icon: Person,
      component: MalariaPortal,
      layout: "/app",
      showInDrawer: false,
    },
    {
      path: "/portal/cholera",
      name: "Cholera",
      icon: Person,
      component: CholeraPortal,
      layout: "/app",
      showInDrawer: false,
    },
    {
      path: "/portal/h1n1",
      name: "H1N1",
      icon: Person,
      component: H1N1Portal,
      layout: "/app",
      showInDrawer: false,
    },
    {
      path: "/portal/hiv",
      name: "HIV/AIDS",
      icon: Person,
      component: HIVPortal,
      layout: "/app",
      showInDrawer: false,
    },
    // User Profile routes
    {
      path: "/create-experience",
      name: "Create New",
      icon: AddCircleIcon,
      component: CreateExperience,
      layout: "/app",
      showInDrawer: loggedIn !== null ? true : false,
    },
    {
      path: "/user",
      name: "Profile",
      icon: Person,
      component: ProfilePage,
      layout: "/app",
      showInDrawer: loggedIn !== null ? true : false,
    },

    loggedIn !== null ? {
      path: "/logout",
      name: "Logout",
      icon: ExitToAppIcon,
      component: Logout,
      layout: "/app",
      showInDrawer: true,
    } : {
      path: "auth",
      name: "Login",
      icon: VpnKeyIcon,
      component: Auth,
      layout: "/",
      showInDrawer: true,
    },

    {
      path: "pagenotfound",
      name: "Page not found",
      icon: null,
      component: AppPageNotFound,
      layout: null,
      showInDrawer: false,
    },

  ]);
};

export default appRoutes;
