import { MainComponent } from './pages/main/main.component';
import { ConfirmRegistrationComponent } from './auth/confirm-registration/confirm-registration.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'registration/confirm',
    component: ConfirmRegistrationComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  { path: '', redirectTo: 'registration', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
