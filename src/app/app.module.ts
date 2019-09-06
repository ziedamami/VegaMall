import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {ChartModule} from 'primeng/chart';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule,MatFormFieldModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import { FormproductComponent } from './components/formproduct/formproduct.component';
import { ProviderComponent } from './components/provider/provider.component';
import { OffreformComponent } from './offreform/offreform.component';

import { FonctionnaliteComponent } from './components/fonctionnalite/fonctionnalite.component';
import {MatTreeModule, MatIconModule, MatButtonModule} from '@angular/material'
import {MatListModule} from '@angular/material';






import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material";

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddComponent } from './components/ToolsAccessLevel/add/add.component';
import { EditComponent } from './components/ToolsAccessLevel/edit/edit.component';
import { DeleteComponent } from './components/ToolsAccessLevel/delete/delete.component';

import { ProfiletableComponent } from './components/profiletable/profiletable.component';
import { EditpComponent } from './components/ToolsProviderRoot/editp/editp.component';
import { AddpComponent } from './components/ToolsProviderRoot/addp/addp.component';
import { DeletepComponent } from './components/ToolsProviderRoot/deletep/deletep.component';

import { ProviderroottableComponent } from './components/providerroottable/providerroottable.component';

@NgModule({
  imports: [
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTableModule, 
    NgbModule,
    FontAwesomeModule,
MatSnackBarModule,

    MatTreeModule, 
    MatIconModule, 
    MatButtonModule,
    MatListModule,
    ChartModule,
    AgmCoreModule.forRoot({



      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    FormproductComponent,

    ProviderComponent,
    FonctionnaliteComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    ProfiletableComponent,
    AddpComponent,
    EditpComponent,
    DeletepComponent,
    ProviderroottableComponent ,
     ProviderComponent,
    
    OffreformComponent
    
   

  ],
  entryComponents: [
    AddComponent,
    EditComponent,
    DeleteComponent,
    AddpComponent,
    EditpComponent,
    DeletepComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],

  

})
export class AppModule { }
