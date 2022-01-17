
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
//import Unarchive from "@material-ui/icons/Unarchive";
//import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Groups/Groups";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";

// core components/views for Auth layout

import ResetPassword from "views/Pages/ResetPassword";
import ConfirmEmail from "views/Pages/ConfirmEmail";
import ResetPasswordSuccess from "views/Pages/ResetPasswordSuccess";
import ConfirmPassword from "views/Pages/ConfirmPassword";
import Login from "views/Pages/Login";
import Register from "views/Pages/Register";
import UsersPage from "views/UserProfile/Users";
import RegisterAssociate from "views/Pages/RegisterAssociate";
import Associations from "views/Association/Associations";
import GroupsIcon from '@mui/icons-material/Groups';
import FolderIcon from '@mui/icons-material/Folder';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    role:"USER"
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UsersPage,
    layout: "/admin",
    role:"ADMIN"
  },
  {
    path: "/user",
    name: "Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    api:true,
    role:"USER"
  },
  {
    path: "/table",
    name: "Companies",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    role:"USER"
  },
  {
    path: "/associations",
    name: "Associations",
    rtlName: "طباعة",
    icon: GroupsIcon,
    component: Associations,
    layout: "/admin",
    role:"USER"
  },
  {
    path: "/typography",
    name: "Groups",
    rtlName: "طباعة",
    icon: FolderIcon,
    component: Typography,
    layout: "/admin",
    role:"USER"
  },
  {
  path: "/login",
  name: "Login",
  icon: "ni ni-key-25 text-info",
  component: Login,
  layout: "/auth",
  api: true,
  role:"USER"
},
{
  path: "/register",
  name: "Register",
  icon: "ni ni-circle-08 text-pink",
  component: Register,
  layout: "/auth",
  api: true,
  role:"USER"
  },
  {
    path: "/confirm-email/:id",
    name: "Confirm Email",
    icon: "ni ni-check-bold text-green",
    component: ConfirmEmail,
    layout: "/auth",
    api: true,
    role:"USER"
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "",
    component: ResetPassword,
    layout: "/auth",
    api: true,
    role:"USER"
  },
  {
    path: "/confirm-password/:id",
    name: "Confirm Password",
    icon: "",
    component: ConfirmPassword,
    layout: "/auth",
    api: true,
    role:"USER"
  },
  {
    path: "/reset-success",
    name: "Password Reset Confirmed",
    icon: "",
    component: ResetPasswordSuccess,
    layout: "/auth",
    api: true,
    role:"USER"
  },
  {
    path: "/registerassociate/:ml",
    name: "Register Associate",
    icon: "",
    component: RegisterAssociate,
    layout: "/auth",
    api: true,
    role:"USER"
  },
  
];

export default dashboardRoutes;
