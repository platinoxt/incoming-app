import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ]
    });
  }

  public login(): void {
    if (this.loginForm.invalid) { return; }
    Swal.fire({
      title: 'Autenticando...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .then((credentials) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos'
        })
      });
  }

}
