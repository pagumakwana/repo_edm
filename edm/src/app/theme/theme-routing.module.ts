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
                path: "home",
                loadChildren: "../home/home.module#HomeModule"
            },
            {
                path: "forgotpassword",
                loadChildren: () => import('../auth/forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule)
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
                loadChildren: () => import('../admin/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: "category",
                loadChildren: () => import('../admin/geners/geners.module').then(m => m.GenersModule)
            },
            {
                path: "tracks",
                loadChildren: () => import('../admin/track/track.module').then(m => m.TrackModule)
            },
	     {
                path: "addmodifytrack/:id",
                loadChildren: () => import('../admin/track/addmodifytrack/addmodifytrack.module').then(m => m.AddModifyTrackModule)
            },
	    
            {
                path: "addmodify",
                loadChildren: () => import('../admin/genservices/genservices.module').then(m => m.GenServiceModule)
            },
            {
                path: "coupan",
                loadChildren: () => import('../admin/coupan/coupan.module').then(m => m.CoupanModule)
            },
            {
                path: "config",
                loadChildren: () => import('../admin/masters/masters.module').then(m => m.MastersModule)
            }, {
                path: "profileupdate",
                loadChildren: () => import('../admin/producerprofile/producerprofile.module').then(m => m.ProducerProfileModule)
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }
