import { AttractionService } from './shared-service/attraction.service';
import { WorkerService } from './shared-service/worker.service';
import { LoginServiceService } from './shared-service/login.service';
import { Globals } from './classes/globals';
import { WorkerFormComponent } from './components/worker-form/worker-form.component';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ListWorkerComponent } from './components/list-worker/list-worker.component';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { PopupModule } from 'ng2-opd-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListAttractionComponent } from './components/list-attraction/list-attraction.component';
import { AttractionFormComponent } from './components/attraction-form/attraction-form.component';
import { ShiftManagementComponent } from './components/shift-management/shift-management.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatInputModule, MatCardModule, MatButtonModule, MatMenuModule,
   MatSnackBarModule, MatAutocompleteModule, MatCheckboxModule } from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TechnicSiteComponent } from './components/technic-site/technic-site.component';
import { RequestSiteComponent } from './components/request-site/request-site.component';
import { TakenSeatsComponent } from './components/taken-seats/taken-seats.component';
import { RequestCheckComponent } from './components/request-check/request-check.component';

const appRoutes: Routes = [
  {path: 'worker-form', component: WorkerFormComponent},
  {path: '', component: LoginFormComponent},
  {path: 'worker-list', component: ListWorkerComponent},
  {path: 'attraction-list', component: ListAttractionComponent},
  {path: 'attraction-form', component: AttractionFormComponent},
  {path: 'shift-management', component: ShiftManagementComponent},
  {path: 'technic-site', component: TechnicSiteComponent},
  {path: 'taken-seats', component: TakenSeatsComponent},
  {path: 'request-site', component: RequestSiteComponent},
  {path: 'request-check', component: RequestCheckComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListWorkerComponent,
    LoginFormComponent,
    MainToolbarComponent,
    WorkerFormComponent,
    ListAttractionComponent,
    AttractionFormComponent,
    ShiftManagementComponent,
    TechnicSiteComponent,
    RequestSiteComponent,
    TakenSeatsComponent,
    RequestCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    PopupModule.forRoot(),
    MatSnackBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [WorkerService, LoginServiceService, Globals, AttractionService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
