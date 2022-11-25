import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePreviewComponent } from './components/home-preview/home-preview.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: "", component: HomePreviewComponent },
  { path: "home-prev", component: HomePreviewComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }, 
  { path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
