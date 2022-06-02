import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  @Input() products: any[];
  searchParam: string;
  @Input() productsSearch: any = [];

  constructor() {}

  ngOnInit(): void {}

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
