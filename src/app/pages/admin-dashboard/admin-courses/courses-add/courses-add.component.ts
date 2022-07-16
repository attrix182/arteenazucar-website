import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { AlertService } from 'src/app/services/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { FormValidator } from 'src/app/shared/form-validator';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.scss']
})
export class CoursesAddComponent extends FormValidator implements OnInit {
  filePath: string;
  image: File;
  selectImage: boolean = true;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageUrl: string;
  course: any;
  isEdit:boolean = false;

  @Input() courseToEdit = null;

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
    this.isEditVerify(this.courseToEdit);
  }

  isEditVerify(courseToEdit){
    console.log(courseToEdit);
    if (courseToEdit) {
      this.isEdit = true;
      this.course = courseToEdit;
      this.formGroup.setValue({
        name: this.course.name,
        price: this.course.price,
        description: this.course.description,
        image: this.course.image
      });

      this.imgResultAfterCompress = this.course.image;
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

  addCourse() {
    console.log(this.formGroup.value);
    let course = this.formGroup.value;
    course.image = this.imgResultAfterCompress.split(/,(.+)/)[1];
    this.storageSVC.InsertCourseWithImage('courses', course);
    this.clearForm();
    this.alertSVC.alertTop('success', 'Curso agregado con exito');
  }

  updateCourse(){
    let course = this.formGroup.value;
    course.image = this.imgResultAfterCompress.split(/,(.+)/)[1];
    this.storageSVC.UpdateCourse(this.course.id, 'courses',  course);
    this.clearForm();
    this.alertSVC.alertTop('success', 'Curso actualizado con exito');
  }

  clearForm() {
    this.courseToEdit = null;
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
    this.clearForm();
  }
}

