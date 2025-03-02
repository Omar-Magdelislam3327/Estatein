import { AgnetdashboardComponent } from './agentPanel/agnetdashboard/agnetdashboard.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './userPanel/home/home.component';
import { ServicesComponent } from './userPanel/services/services.component';
import { PropComponent } from './userPanel/prop/prop.component';
import { PropDetailsComponent } from './userPanel/prop-details/prop-details.component';
import { AboutComponent } from './userPanel/about/about.component';
import { DashboardComponent } from './adminPanel/dashboard/dashboard.component';
import { AddpropComponent } from './agentPanel/addprop/addprop.component';
import { EditpropComponent } from './agentPanel/editprop/editprop.component';
import { ListpropComponent } from './adminPanel/properties/listprop/listprop.component';
import { LoginComponent } from './access/login/login.component';
import { ProfileComponent } from './userPanel/profile/profile.component';
import { SignupComponent } from './access/signup/signup.component';
import { AgentListComponent } from './agentPanel/agent-list/agent-list.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './userPanel/contact/contact.component';
import { AddAgenetComponent } from './adminPanel/agents/add-agenet/add-agenet.component';
import { ListAgenetComponent } from './adminPanel/agents/list-agenet/list-agenet.component';
import { MessagesComponent } from './agentPanel/messages/messages.component';
import { OrderComponent } from './adminPanel/order/order.component';
import { AgentOrdersComponent } from './agentPanel/agent-orders/agent-orders.component';

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "login", component: LoginComponent, title: "Mogasoft | Login" },
  { path: "sign-up", component: SignupComponent, title: "Mogasoft | Sign Up" },
  { path: "home", component: HomeComponent, title: "Mogasoft | Home" },
  { path: "about", component: AboutComponent, title: "Mogasoft | About Us" },
  { path: "services", component: ServicesComponent, title: "Mogasoft | Services" },
  { path: "properties", component: PropComponent, title: "Mogasoft | Properties" },
  { path: "properties/:id", component: PropDetailsComponent, title: "Mogasoft | Properties" },
  { path: "profile", data: { role: "User" }, component: ProfileComponent, title: "Mogasoft | Profile" },
  { path: "contact", component: ContactComponent, title: "Mogasoft | Contact" },
  {
    path: "admin",
    children: [
      { path: "dashboard", data: { role: "Admin" }, component: DashboardComponent, title: "Mogasoft | Dashboard", canActivate: [AuthGuard] },
      {
        path: "properties", children: [
          { path: "list", data: { role: "Admin" }, component: ListpropComponent, title: "Mogasoft | Properties", canActivate: [AuthGuard] },
        ]
      },
      {
        path: "agents", children: [
          { path: "add", data: { role: "Admin" }, component: AddAgenetComponent, title: "Mogasoft | Agents", canActivate: [AuthGuard] },
          { path: "list", data: { role: "Admin" }, component: ListAgenetComponent, title: "Mogasoft | Agents", canActivate: [AuthGuard] }
        ]
      },
      // { path: "orders", data: { role: "Admin" }, component: OrderComponent, title: "Mogasoft | Orders", canActivate: [AuthGuard] }
    ]
  },
  {
    path: "agent", children: [
      { path: "add", data: { role: "Agent" }, component: AddpropComponent, title: "Mogasoft | Add Property", canActivate: [AuthGuard] },
      { path: "edit/:id", data: { role: "Agent" }, component: EditpropComponent, title: "Mogasoft | Edit Property", canActivate: [AuthGuard] },
      { path: "list", data: { role: "Agent" }, component: AgentListComponent, title: "Mogasoft | List", canActivate: [AuthGuard] },
      { path: "messages", data: { role: "Agent" }, component: MessagesComponent, title: "Mogasoft | Messages", canActivate: [AuthGuard] },
      { path: "orders", data: { role: "Agent" }, component: AgentOrdersComponent, title: "Mogasoft | Order", canActivate: [AuthGuard] },
      { path: "dashboard", data: { role: "Agent" }, component: AgnetdashboardComponent, title: "Mogasoft | Dashboard", canActivate: [AuthGuard] }
    ]
  },
  { path: "**", redirectTo: "/home", pathMatch: 'full' }
];
