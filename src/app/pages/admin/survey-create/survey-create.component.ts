import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../../../common/data-sharing.service';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent {

  constructor(private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService
  ) {}

  // dynamic content to navbar from survey-create page
  dynamicContent =
    [
      JSON.stringify({
        'label': 'Validate',
        // 'routeUrl': 'admin/survey-create' //need to be handled
      }),
      JSON.stringify({
        'label': 'Create',
        // 'routeUrl': 'admin' //need to be handled
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
  }

  //(helper) default value to be set to the survey-detail formGroup
  setValue(): void {
    this.surveyDetailsForm.patchValue({
      surveyTitle: "Sample Title",
      surveyDescription: "Sample Description"
    })
  }
}
