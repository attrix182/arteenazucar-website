import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationAbstract } from 'src/app/shared/form-validation-abstract';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  extends FormValidationAbstract implements OnInit {

  public user: any = {};
  public formGroup: FormGroup;
  auth: any;
  alertSVC: any;

  constructor(
    private FB: FormBuilder,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.FB.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  setErrorMessages() {
    this.errroMessages = {
      email: {
        required: 'El correo es obligatorio',
        pattern: 'El correo no es válido',
      },
      password: {
        required: 'La contraseña es obligatoria',
        minlength: 'La contraseña debe tener al menos 6 caracteres',
      },
    };
  }

  async onLogin() {
    this.user = this.formGroup.value;
    try {
      const user = await this.auth.onLogin(this.user);
      if (user) {
        this.router.navigate(['/panel']);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          this.alertSVC.alertBottom('error', 'Usuario inexistente');
          break;
        case 'auth/wrong-password':
          this.alertSVC.alertBottom('error', 'Usuario inexistente');
          break;
        case 'auth/too-many-requests':
          this.alertSVC.alertBottom(
            'error',
            'Se ha intentado ingresar sin exito varias veces, espere unos minutos y vuelva a intentarlo'
          );
      }
    }
  }
}