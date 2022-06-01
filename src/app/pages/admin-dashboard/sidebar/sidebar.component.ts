import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authSVC:AuthService, private router:Router) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.authSVC.LogOutCurrentUser();
    this.router.navigateByUrl('/');
  }
}
