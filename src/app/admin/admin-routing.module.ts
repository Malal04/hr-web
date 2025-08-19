import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MainComponent } from './main/main.component';
import { AddComponent } from './employe/add/add.component';
import { ListeComponent } from './employe/liste/liste.component';
import { AddComponent as AddComponent2 } from './departement/add/add.component';
import { ListeComponent as ListeComponent2 } from './departement/liste/liste.component';
import { TachesAddComponent } from './taches/taches-add/taches-add.component';
import { TachesListesComponent } from './taches/taches-listes/taches-listes.component';
import { EditEmployeComponent } from './employe/edit-employe/edit-employe.component';
import { EditDepartComponent } from './departement/edit-depart/edit-depart.component';
import { EditTachesComponent } from './taches/edit-taches/edit-taches.component';
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
      //departements
      { 
        path: 'departements/add', component: AddComponent2
      },
      { 
        path: 'departements/liste', component: ListeComponent2
      },
      { 
        path: 'departements/edit/:id', component: EditDepartComponent
      },
      //employes
      { 
        path: 'employes/adds', component: AddComponent
      },
      { 
        path: 'employes/listes', component: ListeComponent
      },
      { 
        path: 'employes/edit/:id', component: EditEmployeComponent
      },
      //taches
      { 
        path: 'taches/adds', component: TachesAddComponent
      },
      { 
        path: 'taches/listes', component: TachesListesComponent
      },
      { 
        path: 'taches/edit/:id', component: EditTachesComponent
      },
      //profile
      { 
        path: 'profile', component: ProfileComponent
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
