import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.less'],
})
export class ConfirmRegistrationComponent {

  confirmationCodeForm = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.pattern(/^[\d]+$/)]),
  });

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  public error(): string | null {
    console.log(this.confirmationCodeForm.get('code')?.touched)
    let isControlTouched = this.confirmationCodeForm.get('code')?.touched;
    let errorArray = this.confirmationCodeForm.get('code')?.errors;
    console.log(errorArray)
    if(isControlTouched && errorArray){
      if(Object.keys(errorArray).join(' ').includes('required')){
        return 'Поле обязательно для заполнения'
      }
      if(Object.keys(errorArray).join(' ').includes('pattern')){
        return 'Пожалуйста, введите корректный код'
      }
    }
      return null;
    };
  
  onSubmit() {
    console.log(typeof this.confirmationCodeForm.controls.code.value)
    console.log('string', this.confirmationCodeForm.controls.code.value, 'result')

    console.log(this.confirmationCodeForm.valid)
    if (!this.confirmationCodeForm.valid) {
      return this.confirmationCodeForm.markAllAsTouched();
    }
    this.authService
      .postCode({
        code: this.confirmationCodeForm.controls.code.value,
      })
      .subscribe((result: any) => {
    console.warn('test:',result,'<-')
        this.router.navigateByUrl('/main');
      });
  }

}
