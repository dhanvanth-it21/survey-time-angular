import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent {

  constructor(private formBuilder: FormBuilder) {}

  surveyDetailsForm!: FormGroup;
  
  ngOnInit() {
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
