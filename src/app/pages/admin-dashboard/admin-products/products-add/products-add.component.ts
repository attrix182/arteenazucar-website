import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

  constructor(
    private FB: FormBuilder,
    private alertSV: AlertService,
    private storageSVC: StorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  definirMensajesError(): void {}

  addProduct() {
    console.log(this.formGroup.value);
    let product = this.formGroup.value;
    product.image = this.image;
    this.storageSVC.InsertWithImage('products', product);
    this.formGroup.setValue({
      name: '',
      price: '',
      description: '',
      image: ''
    });
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.image = (e.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({
      image: file,
    });

    this.formGroup.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }




  initializeForm() {
    this.formGroup = this.FB.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  }
}
