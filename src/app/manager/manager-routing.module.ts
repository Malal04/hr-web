import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MainComponent } from './main/main.component';
import { EditsTacheComponent } from './taches/edits-tache/edits-tache.component';
import { AddTachesComponent } from './taches/add-taches/add-taches.component';
import { ListeTachesComponent } from './taches/liste-taches/liste-taches.component';
import { IndexEmployerComponent } from './employe/index-employer/index-employer.component';
import { AddEmployerComponent } from './employe/add-employer/add-employer.component';
import { EditeEmployeComponent } from './employe/edite-employe/edite-employe.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: DashbordComponent, children:[
      { 
        path: '', redirectTo: 'menu', pathMatch: 'full' 
      },
      { 
        path: 'menu', component: MainComponent
      },
      // Taches
      { 
        path: 'taches/add', component: AddTachesComponent
      },
      { 
        path: 'taches/edit/:id', component: EditsTacheComponent
      },
      {
        path: 'taches/listes', component: ListeTachesComponent
      },
      //employes
      {
        path: 'employes/listes', component: IndexEmployerComponent
      },
      {
        path: 'employes/add', component: AddEmployerComponent
      },
      {
        path: 'employes/edit/:id', component: EditeEmployeComponent
      },
      // profile
      {
        path: 'profile', component: ProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
