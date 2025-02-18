import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../../../common/data-sharing.service';
import { ClickEventService } from '../../../common/click-event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent {

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


  // survey details formGroup initialization
  surveyDetailsForm!: FormGroup;
  

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

    //(helper call)
    this.setValue();

   
   // Event Button handling functionality , event form the navBar
   this.clickEventServiceSubcription = this.clickEventService.shareData$.subscribe((button) => {
    if(button === "Create") {
      console.log("Create button clicked at survey create page");
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

  ngOnDestroy() {
    this.clickEventServiceSubcription.unsubscribe();
  }
  

}
