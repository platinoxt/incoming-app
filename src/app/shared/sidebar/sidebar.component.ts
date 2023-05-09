import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authService: AuthService,
    private router: Router) { }

  public logout(): void {
    this.authService.logout().
      then(() => {
        this.router.navigate(['/login']);
      });
  }
}
