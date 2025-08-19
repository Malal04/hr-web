import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OublieComponent } from './oublie/oublie.component';
import { ReussiteComponent } from './reussite/reussite.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'oublier', pathMatch: 'full' },
  
  {path: 'oublier', component: OublieComponent},

  {path: 'reussite', component: ReussiteComponent},

  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
