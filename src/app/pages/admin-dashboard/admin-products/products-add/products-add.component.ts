import { Component, OnInit } from '@angular/core';
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
export class ProductsAddComponent extends FormValidator implements OnInit {
  filePath: string;
  image: File;
  selectImage: boolean = true;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageUrl: string;
  product: any;

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
  }

  clearForm() {
    this.formGroup.reset();
    this.alertSVC.alertTop('success', 'Producto agregado con exito');
  }

  /*   imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.image = (e.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({
      image: file
    });

    this.formGroup.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(this.image);
  } */

  initializeForm() {
    this.formGroup = this.FB.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  }
}
