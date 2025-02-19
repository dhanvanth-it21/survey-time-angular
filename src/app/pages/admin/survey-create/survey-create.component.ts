import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../../../common/data-sharing.service';
import { ClickEventService } from '../../../common/click-event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent {


  // survey details formGroup initialization
  survey!: FormGroup;
  surveyDetailsForm!: FormGroup;
  questionsForm!: FormArray;

  constructor(private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService,
    private clickEventService: ClickEventService,
  ) {}


  //subscription 
  clickEventServiceSubcription!: Subscription;

  // dynamic content to navbar from survey-create page
  dynamicContent =
    [
      JSON.stringify({
        'label': 'Validate',
        'routeUrl': null //need to be handled
      }),
      JSON.stringify({
        'label': 'Create',
        'routeUrl': null //need to be handled
      }),
      JSON.stringify({
        'label': 'Discard',
        'routeUrl': 'admin'
      }),
    ]


  

  ngOnInit() {

    // updating the observable for dynamic navbar
    this.dataSharingService.updateData(this.dynamicContent);

    

    // survey title and description formGroup
    this.surveyDetailsForm = this.formBuilder.group({
      surveyTitle: ['',[
        Validators.required,
      ]],
      surveyDescription : [''],
    })

    //question formgroup
    this.questionsForm = this.formBuilder.array([FormGroup]);

    //total survey's formgroup
    this.survey = this.formBuilder.group({
      surveyDetailsForm: this.surveyDetailsForm,
      questionsForm: this.questionsForm,
    })

    //(helper call)
    this.setValue();

   
   // Event Button handling functionality , event form the navBar
   this.clickEventServiceSubcription = this.clickEventService.shareData$.subscribe((button) => {
    if(button === "Create") {
      this.ngSubmitSurveyDetails();
    }
    else if(button === "Validate") {
      console.log("Valdiate button clicked at survey create page");
    }
    else if(button === "Discard") {
      console.log("Discard button clicked at survey create page");
    }
   })

  }

  //(helper) default value to be set to the survey-detail formGroup
  setValue(): void {
    this.surveyDetailsForm.patchValue({
      surveyTitle: "Sample Title",
      surveyDescription: "Sample Description"
    })
  }

  //formGroup: (sruvey title and description) submit 
  ngSubmitSurveyDetails() {
    console.log(this.surveyDetailsForm.value);
  }

  addFormToQuestion(event: FormGroup) {
    console.log(event.controls);
  }

  ngOnDestroy() {
    this.clickEventServiceSubcription.unsubscribe();
  }
  

}
