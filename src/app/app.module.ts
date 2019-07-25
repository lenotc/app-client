import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientsComponent} from './clients/clients.component';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormComponent} from './clients/form/form.component';
import {FormsModule} from '@angular/forms';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {registerLocaleData} from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {PaginatorComponent} from './paginator/paginator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {DetailsComponent} from './clients/details/details.component';
import {LoginComponent} from './users/login/login.component';
import {AuthGuard} from './users/guards/auth.guard';
import {RoleGuard} from './users/guards/role.guard';
import {TokenInterceptor} from './users/interceptors/token.interceptor';
import {AuthInterceptor} from './users/interceptors/auth.interceptor';

registerLocaleData(ptBr);

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'directive', component: DirectivaComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'clients/page/:page', component: ClientsComponent},
  {path: 'clients/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  {path: 'clients/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
    DetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-PT'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
