// @material-ui/icons
import WidgetsIcon from '@material-ui/icons/Widgets';
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import HealingIcon from '@material-ui/icons/Healing';
// core components/views for App layout
import ProfilePage from "../views/ProfilePage/Profile.js";
import DiseaseInfo from '../views/DiseaseInfo/DiseaseInfo.js';
import UserProjects from "../views/UserProjects/UserProjects.js"
import Logout from '../views/Logout/logout.js';
import CholeraPortal from '../views/Portals/Cholera.js';
import EbolaPortal from '../views/Portals/Ebola.js';
import MalariaPortal from '../views/Portals/Malaria.js';
import H1N1Portal from '../views/Portals/H1N1.js';
import Auth from '../views/Auth/AuthPage.js';

export const appRoutes = () => {

  var loggedIn = localStorage.getItem('profile');

  if (loggedIn === null) {

  }

  var portalsList = [
    { name: "Cholera", path: '/app/portal/cholera' },
    { name: "Malaria", path: '/app/portal/malaria' },
    { name: "H1N1", path: '/app/portal/h1n1' },
    { name: "Ebola", path: '/app/portal/ebola' },

  ];

  return ([

    // Project routes
    {
      path: "/portals",
      name: "Portals",
      icon: WidgetsIcon,
      component: UserProjects,
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

    // Individual Epidemic Portals
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
    // User Profile routes
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

  ]);
};

export default appRoutes;
