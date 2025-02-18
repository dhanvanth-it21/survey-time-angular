import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyPreviewComponent } from './survey-preview/survey-preview.component';
import { SurveyResponsesComponent } from './survey-responses/survey-responses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './questions/question/question.component';
import { DropdownComponent } from './questions/dropdown/dropdown.component';
import { TypeComponent } from './questions/type/type.component';
// import { ButtonDirective } from '../../common/button.directive';


@NgModule({
  declarations: [
    DashboardComponent,
    SurveyCreateComponent,
    SurveyPreviewComponent,
    SurveyResponsesComponent,
    QuestionComponent,
    DropdownComponent,
    TypeComponent,
    // ButtonDirective,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
