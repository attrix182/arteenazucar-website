import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  @Output() changeSection = new EventEmitter<any>();
  actualSection = this.router.url.split('/')[1];

  constructor(private router: Router, private location: Location) {}

  goTo(section: string) {
    this.location.replaceState(`/${section}`);
    this.actualSection = section;
    this.changeSection.emit();
  }
}
