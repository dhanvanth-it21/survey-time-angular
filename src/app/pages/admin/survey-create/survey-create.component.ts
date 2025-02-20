import { Component, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../../../common/data-sharing.service';
import { ClickEventService } from '../../../common/click-event.service';
import { Subscription } from 'rxjs';
import { faPlus, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SurveyTransformService } from '../../../common/survey-transform.service';
import { ApiService } from '../../../common/api.service';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrl: './survey-create.component.css'
})
export class SurveyCreateComponent {

  public faPlus: IconDefinition = faPlus;
  public faTrash: IconDefinition = faTrash;


  // survey details formGroup initialization
  survey!: FormGroup;
  surveyDetailsForm!: FormGroup;
  questionsForm!: FormArray;

  constructor(private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService,
    private clickEventService: ClickEventService,
    private el: ElementRef,
    private surveyTransformService: SurveyTransformService,
    private apiService: ApiService
  ) { }





  //active question
  activeQuestionIndex: number = -1;

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
      surveyTitle: ['', [
        Validators.required,
      ]],
      surveyDescription: [''],

    })

    //question formgroup
    this.questionsForm = this.formBuilder.array([]);

    //total survey's formgroup
    this.survey = this.formBuilder.group({
      surveyDetailsForm: this.surveyDetailsForm,
      questionsForm: this.questionsForm,
    })

    //(helper call)
    this.setValue();


    // Event Button handling functionality , event form the navBar
    this.clickEventServiceSubcription = this.clickEventService.shareData$.subscribe((button) => {
      if (button === "Create") {
        this.ngSubmitSurvey();
      }
      else if (button === "Validate") {
        console.log("Valdiate button clicked at survey create page");
      }
      else if (button === "Discard") {
        console.log("Discard button clicked at survey create page");
      }
    })

    setTimeout(() => {this.makePosition();},1)

    

  }

  //(helper) default value to be set to the survey-detail formGroup
  setValue(): void {
    this.surveyDetailsForm.patchValue({
      surveyTitle: "Sample Title",
      surveyDescription: "Sample Description"
    })
  }

  //formGroup:  submit 
  ngSubmitSurvey() {
    // console.log(this.survey.value);
    const surveyObject = this.surveyTransformService.transformFormToSurveyObject(this.survey.value);
    this.apiService.postCreatedSurvey(JSON.stringify({surveyObject: surveyObject}));
    // console.log(surveyObject)

  }

  addFormToQuestion(formGroup: FormGroup, i: number) {
    this.questionsForm.setControl(i, formGroup);
  }

  addQuestion(event: MouseEvent) {
    const newQuestion = this.formBuilder.group({
      question: [''],
      type: [''],
      selectedType: this.formBuilder.group({}),
      isRequired: [false],
    });

    if (this.activeQuestionIndex !== -1) {
      this.questionsForm.insert(this.activeQuestionIndex + 1, newQuestion);
      this.activeQuestionIndex++;
    } else {
      this.questionsForm.push(newQuestion);
      this.activeQuestionIndex = this.questionsForm.length - 1;
    }

    setTimeout(() => {this.makePosition();},1)


  }


  setActiveQuestion(index: number) {
    this.activeQuestionIndex = index;
  }

  sideMenuPosition(event: MouseEvent) {
    event.stopPropagation();
    const div = event.target as HTMLElement;
    setTimeout(() => {this.makePosition();},1)

  }

  makePosition() {
    const activeBox = this.el.nativeElement.querySelector('.active-box');
    if (activeBox && typeof (activeBox as HTMLElement).getBoundingClientRect === 'function') {
      const rect = (activeBox as HTMLElement).getBoundingClientRect();
      const sideMenu = this.el.nativeElement.querySelector(".side-menu");
  
      sideMenu.style.left = `${rect.right + 10}px`;
      sideMenu.style.top = `${rect.top + window.scrollY + rect.height - 120}px`;
      sideMenu.style.height = `120px`;
      sideMenu.style.display = "flex";
    }
  }


  deleteQuestion() {
    if (this.activeQuestionIndex === -1) {
      return;
    }

    this.questionsForm.removeAt(this.activeQuestionIndex);

    // Update active index
    if (this.questionsForm.length === 0) {
      this.activeQuestionIndex = -1;
    } else if (this.activeQuestionIndex >= this.questionsForm.length) {
      this.activeQuestionIndex = this.questionsForm.length - 1;
    }

    setTimeout(() => {this.makePosition();},1)

  }



  getFormGroup(index: number): FormGroup {
    return this.questionsForm.at(index) as FormGroup;
  }


  ngOnDestroy() {
    this.clickEventServiceSubcription.unsubscribe();
  }


}
