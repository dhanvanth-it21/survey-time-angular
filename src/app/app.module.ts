import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SurveyCreateComponent } from './pages/admin/survey-create/survey-create.component';
import { SurveyPreviewComponent } from './pages/admin/survey-preview/survey-preview.component';
import { SurveyResponsesComponent } from './pages/admin/survey-responses/survey-responses.component';
import { AvailableSurveysComponent } from './pages/user/available-surveys/available-surveys.component';
import { RespondSurveyComponent } from './pages/user/respond-survey/respond-survey.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { ButtonDirective } from './button.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ButtonDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
