// @material-ui/icons
import WidgetsIcon from '@material-ui/icons/Widgets';
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// core components/views for App layout
import ProfilePage from "../views/ProfilePage/Profile.js";
import UserProjects from "../views/UserProjects/UserProjects.js"
import ProjectScreen from '../views/ProjectDetails/ProjectScreen.js';
import Logout from '../views/Logout/logout.js';

export const appRoutes = (projects) => {

  var projectList = [];
  projects.forEach((project) => {
    projectList.push({ name: project.name, path: `/app/project/${project._id}` })
  });

  return ([

    // Project routes
    {
      path: "/projects",
      name: "My Projects",
      icon: WidgetsIcon,
      component: UserProjects,
      layout: "/app",
      showInDrawer: true,
      listItems: projectList,
    },
    {
      path: "/project/:projectID",
      name: "Project Details",
      icon: Person,
      component: ProjectScreen,
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
      showInDrawer: true,
    },

    {
      path: "/logout",
      name: "Logout",
      icon: ExitToAppIcon,
      component: Logout,
      layout: "/app",
      showInDrawer: true,
    },

  ]);
};

export default appRoutes;
