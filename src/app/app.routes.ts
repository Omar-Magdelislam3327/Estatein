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

export const routes: Routes = [
  {path:"" , component:LoginComponent , canActivate: [AuthGuard] },
  {path:"sign-up" , component:SignupComponent , title:"Estatein | Sign Up"},
  {path:"home" , component:HomeComponent , title:"Estatein | Home"},
  {path:"about" , component:AboutComponent , title:"Estatein | About Us"},
  {path:"services" , component:ServicesComponent , title:"Estatein | Services"},
  {path:"properties" , component:PropComponent , title:"Estatein | Properties"},
  {path:"properties/:id" , component:PropDetailsComponent , title:"Estatein | Properties"},
  {path:"profile", component:ProfileComponent , title:"Estatein | Profile"},
  {path:"contact" , component:ContactComponent , title:"Estatein | Contact"},
  {path:"admin", children:[
    {path:"dashboard" , component:DashboardComponent , title:"Estatein | Dashboard"},
    {path:"properties" , children:[
      {path:"list" , component:ListpropComponent , title:"Estatein | Properties"},
    ]},
    {path:"agents" , children:[
      {path:"add" , component:AddAgenetComponent , title:"Estatein | Agents"},
      {path:"list" , component:ListAgenetComponent , title:"Estatein | Agents"}
    ]},
    {path:"orders" , component:OrderComponent , title:"Estatein | Orders"}
  ]},
  {path:"agent" , children:[
    {path:"add" , component:AddpropComponent , title:"Estatein | Add Property"},
    {path:"edit/:id" , component:EditpropComponent , title:"Estatein | Edit Property"},
    {path:"list" , component:AgentListComponent , title:"Estatein | List"},
    {path:"messages" , component:MessagesComponent , title:"Estatein | Messages"},
    {path:"dashboard" , component:AgnetdashboardComponent , title:"Estatein | Dashboard"}
  ]}
];
