import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    NgCommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TuiInputModule,
    TuiErrorModule,
    TuiInputPasswordModule,
    TuiInputNumberModule,
    TuiButtonModule,
    TuiIslandModule,
  ],
  declarations: [RegistrationComponent, ConfirmRegistrationComponent],
  exports: [RegistrationComponent, ConfirmRegistrationComponent],
})
export class AuthModule {}
