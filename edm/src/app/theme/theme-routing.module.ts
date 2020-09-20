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
                loadChildren: () => import('../gener/gener.module').then(m => m.GenerModule)
            },
            {
                path: "geners/details",
                loadChildren: () => import('../gener/gener.module').then(m => m.GenerModule)
            },
            {
                path: "product/:type",
                loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
            },
            {
                path: "product/:type/details",
                loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
            },
            {
                path: "error",
                loadChildren: () => import('../errors/errors.module').then(m => m.ErrorsModule)
            },
            {
                path: "service",
                loadChildren: () => import('../service/service.module').then(m => m.ServiceModule)
            },
            {
                path: "service/details",
                loadChildren: () => import('../service/service.module').then(m => m.ServiceModule)
            },
            {
                path: "profile",
                loadChildren: () => import('../profiles/profile.module').then(m => m.ProfileModule)
            },
            {
                path: "cart",
                loadChildren: () => import('../cartscreen/cartscreen.module').then(m => m.CartScreenModule)
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
                path: "emailnotification",
                loadChildren: () => import('../admin/emailnotification/emailnotification.module').then(m => m.EmailNotificationModule)
            },
            {
                path: "category",
                loadChildren: () => import('../admin/geners/geners.module').then(m => m.GenersModule)
            },
            {
                path: "tracks/:module",
                loadChildren: () => import('../admin/track/track.module').then(m => m.TrackModule)
            },
            {
                path: "addmodifytracks/:module/:id",
                loadChildren: () => import('../admin/track/addmodifytrack/addmodifytrack.module').then(m => m.AddModifyTrackModule)
            },

            {
                path: "service",
                loadChildren: () => import('../admin/genservices/genservices.module').then(m => m.GenServiceModule)
            },
            {
                path: "coupan",
                loadChildren: () => import('../admin/coupan/coupan.module').then(m => m.CoupanModule)
            },
            {
                path: "config",
                loadChildren: () => import('../admin/masters/masters.module').then(m => m.MastersModule)
            }, 
            {
                path: "profileupdate",
                loadChildren: () => import('../admin/producerprofile/producerprofile.module').then(m => m.ProducerProfileModule)
            },
            {
                path: "support",
                loadChildren: () => import('../admin/support/support.module').then(m => m.SupportModule)
            },
            {
                path: "authority",
                loadChildren: () => import('../admin/authoritymanagement/authority.module').then(m => m.AuthorityModule)
            }, 
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }
