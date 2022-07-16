import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-course-catalog',
  templateUrl: './course-catalog.component.html',
  styleUrls: ['./course-catalog.component.scss']
})
export class CourseCatalogComponent implements OnInit {


  courses: any;

  constructor(private storageSVC:StorageService) { }

  ngOnInit(): void {
   this.getCourses().subscribe(products => {
      this.courses = products;
      console.log(this.courses);
    });
  
  }

  getCourses(){
    return this.storageSVC.GetAll('courses');
  }

}

