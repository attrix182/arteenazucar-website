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
  constructor(private FB: FormBuilder, private alertSV: AlertService, private storageSVC: StorageService) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  definirMensajesError(): void {}

  addProduct(){
    console.log(this.formGroup.value);
  }

  initializeForm() {
    this.formGroup = this.FB.group({
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required])
    });
  }
}
