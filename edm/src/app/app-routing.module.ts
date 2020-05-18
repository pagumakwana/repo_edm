import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', loadChildren: './auth/login/login.module#LoginModule', pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: PreloadAllModules, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
