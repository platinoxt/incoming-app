import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router){}

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    });    
  }

  public createUser(): void {
    if(this.registerForm.invalid){ return; }
    Swal.fire({
      title: 'Creando usuario...',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const { name, email, password } = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then( () => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email ya existe'
        })
      });
  }

}
