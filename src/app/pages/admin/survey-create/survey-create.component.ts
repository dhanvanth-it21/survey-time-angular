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

  dynamicContent =
    [
      JSON.stringify({
        'label': 'Create',
        'routeUrl': 'admin/survey-create'
      }),
    ]

  surveyDetailsForm!: FormGroup;
  
  ngOnInit() {

    this.dataSharingService.updateData(this.dynamicContent);

    this.surveyDetailsForm = this.formBuilder.group({
      surveyTitle: ['',[
        Validators.required,
      ]],
      surveyDescription : [''],
    })

    this.setValue();
  }

  setValue(): void {
    this.surveyDetailsForm.patchValue({
      surveyTitle: "Sample Title",
      surveyDescription: "Sample Description"
    })
  }
}
