import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_enum/user';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canActivate: [AuthGuard], data: { expectedRoles: [Role.Admin] }
    },
    {
        path: 'manager', loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule) , canActivate: [AuthGuard], data: { expectedRoles: [Role.Manager, Role.Employee , Role.Admin] }
    },
    {
        path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
