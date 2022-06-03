import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  searchParam: string;
  public itemsAux: any = [];
  textBtn: string;
  showFormProducts: boolean = false;

  constructor(private storageSVC: StorageService) {}

  ngOnInit(): void {
    this.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });

    this.textBtn = 'Agregar productos';
 
  }

  showForm() {

    this.showFormProducts = !this.showFormProducts;
    this.showFormProducts ? (this.textBtn = 'Ver productos') : (this.textBtn = 'Agregar productos');
  }

  getProducts() {
    return this.storageSVC.GetAll('products');
  }

  addProduct() {
    this.storageSVC.Insert('products', {
      id: '1',
      name: 'Product 1',
      price: '100',
      description: 'Product 1 description'
    });
  }

  orderByPrice(order: string) {
    this.products.sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  deleteItem(item: any) {}

  ngOnDestroy(): void {}
}
