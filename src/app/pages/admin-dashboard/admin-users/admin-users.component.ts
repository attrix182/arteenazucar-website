import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: any[];
  textBtn: string;
  showFormUsers: boolean = false;
  userToEdit: any;

  constructor(private storageSVC: StorageService) {}

  ngOnInit(): void {
    this.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });

    this.textBtn = 'Agregar usuario';
  }

  showForm() {
    this.showFormUsers = !this.showFormUsers;
    this.showFormUsers ? (this.textBtn = 'Ver usuarios') : (this.textBtn = 'Agregar usuario');
  }

  getUsers() {
    return this.storageSVC.GetAll('users');
  }



  editUser(user: any) {
    this.userToEdit = user;
    this.showForm();
    setTimeout(() => {
      this.userToEdit = null;
    }, 1000);
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.userToEdit = null;
  }
}
