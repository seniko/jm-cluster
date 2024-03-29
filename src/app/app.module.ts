
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { HttpModule, Http, BaseRequestOptions } from '@angular/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CuttingCalcComponent } from './cutting-calc/cutting-calc.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { PlannerComponent } from './planner/planner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { ChairComponent } from './chair/chair.component';
import { ClusterComponent } from './cluster/cluster.component';
import { LoginComponent } from './login/login.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { ParticipantsComponent } from './participants/participants.component';
import { ProjectsComponent } from './projects/projects.component';
import { ErpComponent } from './erp/erp.component';
import { ScienceComponent } from './science/science.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';


import { AuthService } from './services/auth.service';
import { ProjectsService } from './services/projects.service';
import { MessagesService } from './services/messages.service';
import { AuthGuard } from './guards/auth.guard';
import { DataService } from './services/data.service';
import { UsersService } from './services/users.service';
import { ModalService } from './services/modal.service';
import { ArticlesService } from './services/articles.service';
import { PartnersService } from './services/partners.service';

import { NgxCaptchaModule } from 'ngx-captcha';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CuttingCalcComponent,
    WarehouseComponent,
    PlannerComponent,
    NotFoundComponent,
    ContactComponent,
    NewsComponent,
    ChairComponent,
    ClusterComponent,
    LoginComponent,
    KnowledgeComponent,
    ParticipantsComponent,
    ProjectsComponent,
    ErpComponent,
    ScienceComponent,
    FooterComponent,
    RegisterComponent,
    DashboardComponent,
    UsersComponent,
    MessagesComponent,
    ProfileComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'cluster',
        component: ClusterComponent
      },
      {
        path: 'chair',
        component: ChairComponent
      },
      {
        path: 'science',
        component: ScienceComponent
      },
      {
        path: 'erp',
        component: ErpComponent
      },
      {
        path: 'cutting-calculation',
        component: CuttingCalcComponent
      },
      {
        path: 'knowledge',
        component: KnowledgeComponent
      },
      {
        path: 'virtual-warehouse',
        component: WarehouseComponent
      },
      {
        path: 'planner',
        component: PlannerComponent
      },
      {
        path: 'participants',
        component: ParticipantsComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'contacts',
        component: ContactComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      },
    ]),
    FlashMessagesModule.forRoot(),
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: '6LeU8oQUAAAAAItHD75RgVXHIl9Z-d9fRClX9Oip'
    }),
  ],
  providers: [
    PartnersService,
    ArticlesService,
    AuthGuard,
    ProjectsService,
    AuthService,
    MessagesService,
    DataService,
    UsersService,
    ModalService,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
