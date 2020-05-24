import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './client/body/body.component';
import { AdminBodyComponent } from './admin/body/body.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    {
        path: "",
        component: ClientComponent,
        children: [
            {
                path: "",
                loadChildren: "../home/home.module#HomeModule"
            },
            {
                path: "login",
                loadChildren: "../auth/login/login.module#LoginModule"
            },
            {
                path: "signup",
                loadChildren: "../auth/signup/signup.module#SignUpModule"
            },
            {
                path: "geners",
                loadChildren: "../gener/gener.module#GenerModule"
            },
            {
                path: "geners/details",
                loadChildren: "../gener/gener.module#GenerModule"
            },
            {
                path: "product",
                loadChildren: "../product/product.module#ProductModule"
            },
            {
                path: "product/details",
                loadChildren: "../product/product.module#ProductModule"
            },
            {
                path: "error",
                loadChildren: "../errors/errors.module#ErrorsModule"
            },
            {
                path: "service",
                loadChildren: "../service/service.module#ServiceModule"
            },
            {
                path: "service/details",
                loadChildren: "../service/service.module#ServiceModule"
            },
            {
                path: "profile",
                loadChildren: "../profiles/profile.module#ProfileModule"
            }
        ],
    },
    {
        path: "admin",
        component: AdminComponent,
        children: [
            {
                path: "",
                loadChildren: "../admin/dashboard/dashboard.module#DashboardModule"
            },
            {
                path: "gener",
                loadChildren: "../admin/geners/geners.module#GenersModule"
            },
            {
                path: "beats",
                loadChildren: "../admin/beats/beats.module#BeatsModule"
            },
            {
                path: "tracks",
                loadChildren: "../admin/track/track.module#TrackModule"
            },
            {
                path: "coupan",
                loadChildren: "../admin/coupan/coupan.module#CoupanModule"
            },
            {
                path: "config",
                loadChildren: "../admin/masters/masters.module#MastersModule"
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }
