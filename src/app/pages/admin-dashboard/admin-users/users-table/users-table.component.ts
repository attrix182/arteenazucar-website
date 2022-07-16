import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input() users: any[];
  searchParam: string;
  @Input() usersSearch: any = [];
  @Output() goToEdit = new EventEmitter<any>();

  constructor(private storageSVC:StorageService, private alertSvc:AlertService) {}

  ngOnInit(): void {}

    async deleteProduct(product: any) {
      console.log(product);
      let confirm: any = false;
      confirm = await this.alertSvc.confirmAlert();
      if (confirm) {
        this.storageSVC.Delete('users', product.id).then(() => {
          this.alertSvc.alertCenter('info', 'El usersSearch ha sido eliminado');
        });
      }
    }

     updateProduct(product: any) {
      this.goToEdit.emit(product);
    }

  hacerBusqueda() {
    if (this.searchParam === '') {
      this.users = this.usersSearch;
      return;
    }
    const serachParamLower = this.searchParam.toLowerCase();
    this.users = this.usersSearch.filter((item) => this.doSearch(item, serachParamLower));
  }

  doSearch(value, searcher) {
    if (typeof value === 'boolean') {
      return false;
    }

    if (typeof value === 'object') {
      for (let fieldKey in value) {
        if (this.doSearch(value[fieldKey], searcher)) {
          return true;
        }
      }
      return false;
    }

    return (typeof value == 'string' ? value.toLocaleLowerCase() : value.toString()).includes(searcher);
  }
}

