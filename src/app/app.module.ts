import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AboutUsComponent } from './sections/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseCatalogComponent } from './sections/course-catalog/course-catalog.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './pages/admin-dashboard/admin-sidebar/admin-sidebar.component';
import { DashboardComponent } from './pages/admin-dashboard/dashboard/dashboard.component';
import { AdminNavbarComponent } from './pages/admin-dashboard/admin-navbar/admin-navbar.component';
import { AdminCoursesComponent } from './pages/admin-dashboard/admin-courses/admin-courses.component';
import { AdminProductsComponent } from './pages/admin-dashboard/admin-products/admin-products.component';
import { ProductsTableComponent } from './pages/admin-dashboard/admin-products/products-table/products-table.component';
import { ProductsCatalogComponent } from './sections/products-catalog/products-catalog.component';
import { ProductCardComponent } from './sections/products-catalog/product-card/product-card.component';
import { ProductsAddComponent } from './pages/admin-dashboard/admin-products/products-add/products-add.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TopbarComponent,
    AboutUsComponent,
    LoginComponent,
    CourseCatalogComponent,
    FooterComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    DashboardComponent,
    AdminNavbarComponent,
    AdminCoursesComponent,
    AdminProductsComponent,
    ProductsTableComponent,
    ProductsCatalogComponent,
    ProductCardComponent,
    ProductsAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPageScrollModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgbModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
