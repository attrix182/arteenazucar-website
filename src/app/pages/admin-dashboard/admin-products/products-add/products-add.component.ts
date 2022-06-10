import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AlertService } from 'src/app/services/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/shared/form-validator';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent extends FormValidator implements OnInit, OnDestroy {
  filePath: string;
  image: File;
  selectImage: boolean = true;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageUrl: string;
  product: any;
  isEdit:boolean = false;

  @Input() productToEdit = null;

  constructor(
    private FB: FormBuilder,
    private alertSVC: AlertService,
    private storageSVC: StorageService,
    private imageCompress: NgxImageCompressService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.isEditVerify(this.productToEdit);
  }

  isEditVerify(productToEdit){
    console.log(productToEdit);
    if (productToEdit) {
      this.isEdit = true;
      this.product = productToEdit;
      this.formGroup.setValue({
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        image: this.product.image
      });

      this.imgResultAfterCompress = this.product.image;
      this.selectImage = false;
    }
  }

  definirMensajesError(): void {}

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompress = image;
      /* console.warn('Size in bytes was:', this.imageCompress.byteCount(image)); */
      this.imageCompress.compressFile(image, orientation, 50, 40).then((result) => {
        this.imgResultAfterCompress = result;
        this.selectImage = false;
      });
    });
  }

  addProduct() {
    console.log(this.formGroup.value);
    let product = this.formGroup.value;
    product.image = this.imgResultAfterCompress.split(/,(.+)/)[1];
    this.storageSVC.InsertWithImage('products', product);
    this.clearForm();
    this.alertSVC.alertTop('success', 'Producto agregado con exito');
  }

  updateProduct(){
    let product = this.formGroup.value;
    product.image = this.imgResultAfterCompress.split(/,(.+)/)[1];
    this.storageSVC.UpdateProduct(this.product.id, 'products',  product);
    this.clearForm();
    this.alertSVC.alertTop('success', 'Producto actualizado con exito');
  }

  clearForm() {
    this.productToEdit = null;
    this.formGroup.reset();
    this.imgResultAfterCompress = '';
  }

  initializeForm() {
    this.formGroup = this.FB.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')
    });
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.clearForm();
  }
}
