import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {

  products: any;

  constructor(private storageSVC:StorageService) { }

  ngOnInit(): void {
   this.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  
  }

  getProducts(){
    return this.storageSVC.GetAll('products');
  }

}
