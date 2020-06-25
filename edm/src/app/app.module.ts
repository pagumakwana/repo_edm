import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './_appService/api.service';
import { CommonService } from './_appService/common.service';
import { AppSessionService } from './_appService/appsession.service';
import { BaseServiceHelper } from './_appService/baseHelper.service';
import { EncryptedStorage } from './_appModel/encryptedstorage';
import { CommonModule } from '@angular/common';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { environment } from './../environments/environment'
import { CategoryService } from './_appService/category/category.serviec';
import { AlertMessageService } from './_appService/alert/alertmessage.service';
import { ToastrModule } from 'ngx-toastr';
import { PageTitleService } from './_appService/_title/title.service';
import { RegisterService } from './_appService/register.service';
import { FileUploadService } from './_appService/fileUploadService/fileUploadService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
export function socialConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.facebook_APP_ID)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.google_Web_CLIENT_ID)
      }
    ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ApiService,
    CommonService,
    AppSessionService,
    BaseServiceHelper,
    EncryptedStorage,
    CategoryService,
    AlertMessageService,
    PageTitleService,
    AuthService,
    RegisterService,
    FileUploadService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
