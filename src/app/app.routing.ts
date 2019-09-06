import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { FormproductComponent } from './components/formproduct/formproduct.component';
<<<<<<< HEAD
import { FonctionnaliteComponent } from './components/fonctionnalite/fonctionnalite.component';
import { ProfiletableComponent } from './components/profiletable/profiletable.component';
import { ProviderroottableComponent } from './components/providerroottable/providerroottable.component';

const routes: Routes =[
  {path: 'login', component: LoginComponent } ,
  {path :'formproduct' ,component: FormproductComponent},
  { path:'fonctionnalite',component : FonctionnaliteComponent} ,
  { path:'profiles',component : ProfiletableComponent} ,
  

  {path:'getallproviderroot',component: ProviderroottableComponent },
=======
import { ProviderrootformComponent } from './components/providerrootform/providerrootform.component';
import { ListproviderrootComponent } from './components/listproviderroot/listproviderroot.component';
import { OffreformComponent } from './offreform/offreform.component';
const routes: Routes =[
  {path: 'login', component: LoginComponent } ,
  {path :'formproduct' ,component: FormproductComponent},
  { path:'addproviderroot',component : ProviderrootformComponent} ,
  {path:'getallproviderroot',component: ListproviderrootComponent },
  {path:'formOffre',component: OffreformComponent },
>>>>>>> ZiedBranch
  { path: '',redirectTo: 'login',pathMatch: 'full',},
  { path: '', component: AdminLayoutComponent,children: [{path: '', 
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  
];

@NgModule({ 
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
