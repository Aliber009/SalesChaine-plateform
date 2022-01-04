
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

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UsersPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Users",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    api:true
  },
  {
    path: "/table",
    name: "Companies",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/associations",
    name: "Associations",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Associations,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Groups",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
  path: "/login",
  name: "Login",
  icon: "ni ni-key-25 text-info",
  component: Login,
  layout: "/auth",
  api: true
},
{
  path: "/register",
  name: "Register",
  icon: "ni ni-circle-08 text-pink",
  component: Register,
  layout: "/auth",
  api: true
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/confirm-email/:id",
    name: "Confirm Email",
    icon: "ni ni-check-bold text-green",
    component: ConfirmEmail,
    layout: "/auth",
    api: true
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "",
    component: ResetPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/confirm-password/:id",
    name: "Confirm Password",
    icon: "",
    component: ConfirmPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/reset-success",
    name: "Password Reset Confirmed",
    icon: "",
    component: ResetPasswordSuccess,
    layout: "/auth",
    api: true
  },
  {
    path: "/registerassociate/:ml",
    name: "Register Associate",
    icon: "",
    component: RegisterAssociate,
    layout: "/auth",
    api: true
  },
  
];

export default dashboardRoutes;
