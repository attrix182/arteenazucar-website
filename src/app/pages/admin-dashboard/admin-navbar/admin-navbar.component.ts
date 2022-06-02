import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authSVC:AuthService, private router:Router) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.authSVC.LogOutCurrentUser();
    this.router.navigateByUrl('/');
  }

}
