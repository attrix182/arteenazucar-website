import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  @Input() products: any[];
  searchParam: string;
  @Input() productsSearch: any = [];
  @Output() goToEdit = new EventEmitter<any>();

  constructor(private storageSVC:StorageService, private alertSvc:AlertService) {}

  ngOnInit(): void {}


    async deleteProduct(product: any) {
      console.log(product);
      let confirm: any = false;
      confirm = await this.alertSvc.confirmAlert();
      if (confirm) {
        this.storageSVC.Delete('products', product.id).then(() => {
          this.alertSvc.alertCenter('info', 'El producto ha sido eliminado');
        });
      }
    }

     updateProduct(product: any) {
      this.goToEdit.emit(product);
    }

  hacerBusqueda() {
    if (this.searchParam === '') {
      this.products = this.productsSearch;
      return;
    }
    const serachParamLower = this.searchParam.toLowerCase();
    this.products = this.productsSearch.filter((item) => this.doSearch(item, serachParamLower));
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
