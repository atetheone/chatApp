import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePreviewComponent } from './components/home-preview/home-preview.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomePreviewComponent },
  { path: "home-prev", component: HomePreviewComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent }, 
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "home-prev"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
