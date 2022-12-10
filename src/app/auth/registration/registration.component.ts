import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { TokenService } from '../../services/token.service';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import * as memoizee from 'memoizee';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
        email: `Пожалуйста, введите валидный email адрес`,
        minlength: `Пароль должен состоять не менее из 6-ти символов`,
        maxlength: `Пароль должен состоять не более из 20-ти символов`,
      },
    },
  ],
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9]+$')
    ]),
    password_confirmation: new FormControl('', [Validators.required]),
  });


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  public errors(regFormControl: string): string | null {
  let isControlTouched = this.registrationForm.get(regFormControl)?.touched;
  let errorsArray = this.registrationForm.get(regFormControl)?.errors;
  if(isControlTouched && errorsArray){
    if(Object.keys(errorsArray).join(' ').includes('required')){
      return 'Поле обязательно для заполнения'
    }
    if(Object.keys(errorsArray).join(' ').includes('email')){
      return 'Пожалуйста, введите валидный email адрес'
    }
    if(Object.keys(errorsArray).join(' ').includes('minlength')){
      return 'Пароль должен состоять не менее из 6-ти символов'
    }
    if(Object.keys(errorsArray).join(' ').includes('maxlength')){
      return 'Пароль должен состоять не более из 20-ти символов'
    }
    if(Object.keys(errorsArray).join(' ').includes('no_password_confirmation')){
      return 'Пароли не совпадают'
    }
  }
    return null;
  };

  onSubmit() {
    console.log(this.registrationForm.valid)
    console.log(this.registrationForm.controls.email.value)

    if (
      this.registrationForm.controls.password.value !==
      this.registrationForm.controls.password_confirmation.value
    ) {
      this.registrationForm
        .get('password_confirmation')
        ?.setErrors({ no_password_confirmation: 'Пароли не совпадают' });
        console.log('invalid')
      return this.registrationForm.markAllAsTouched();
    }
    if (!this.registrationForm.valid) {
      return this.registrationForm.markAllAsTouched();
    }
 
    this.authService.email.next(this.registrationForm.controls.email.value);
    this.authService
      .postRegistrationData({
        email: this.registrationForm.controls.email.value,
        password: this.registrationForm.controls.password.value,
      })
      .subscribe((result: any) => {
        if(result.success){
          this.router.navigateByUrl('/registration/confirm');
        }
      });
  }

}
