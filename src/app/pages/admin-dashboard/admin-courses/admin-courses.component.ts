import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

  courses: any[];
  textBtn: string;
  showFormCourses: boolean = false;
  courseToEdit: any;

  constructor(private storageSVC: StorageService) {}

  ngOnInit(): void {
    this.getCourses().subscribe((courses) => {
      this.courses = courses;
      console.log(this.courses);
    });

    this.textBtn = 'Agregar cursos';
  }

  showForm() {
    this.showFormCourses = !this.showFormCourses;
    this.showFormCourses ? (this.textBtn = 'Ver cursos') : (this.textBtn = 'Agregar cursos');
  }

  getCourses() {
    return this.storageSVC.GetAll('courses');
  }

  editCourse(product: any) {
    this.courseToEdit = product;
    this.showForm();
    setTimeout(() => {
      this.courseToEdit = null;
    }, 1000);
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.courseToEdit = null;
  }
}

