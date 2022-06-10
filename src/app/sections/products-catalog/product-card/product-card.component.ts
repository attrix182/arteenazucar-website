import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;

  public showProduct: any;

  @ViewChild('modalProduct', { read: TemplateRef })
  modalProduct: TemplateRef<any>;

  constructor( private modalSVC: NgbModal) { }

  ngOnInit(): void {
  }

  openModalPost(product) {
    this.showProduct = product;
    this.modalSVC.open(this.modalProduct);
  }


}
