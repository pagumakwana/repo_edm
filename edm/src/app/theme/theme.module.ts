// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeRoutingModule } from './theme-routing.module';
import { HomeModule } from '../home/home.module';
import { LoginModule } from '../auth/login/login.module';
import { SignUpModule } from '../auth/signup/signup.module';
import { WidgetsModule } from '../widgets/widget.module';
import { CommonModule } from '@angular/common';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { CartService } from '../_appService/cart/cart.service';
@NgModule({
    declarations: [
        // ThemeComponent,
        // BodyComponent,
        // HeaderComponent,
        // FooterComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        HomeModule,
        WidgetsModule,
        // GenerModule,
        // ProductModule,
        // ErrorsModule,
        // ServiceModule,
        // ProfileModule,
        ClientModule,
        AdminModule,
        ThemeRoutingModule,
    ],
    providers: [CartService]
})
export class ThemeModule { }
