import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  @Input() 
  singleQuestion!: FormGroup;

  // @Output()
  // formEmitter: EventEmitter<FormGroup> = new EventEmitter();
  

  questionType!: string;

  // singleQuestion!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,

  ) { }

  // ngOnInit(): void {
  //   this.singleQuestion = this.formBuilder.group({
  //     question: [''],
  //     type: [''],
  //     selectedType: this.formBuilder.group({}),
  //     isRequired: [false],
  //   });

  //   this.formEmitter.emit(this.singleQuestion);
  // }

  //question type changed and updated to formgropu: singleQuestion
  handleSelection(type: string) {
    this.questionType = type;
    this.singleQuestion.get('type')?.setValue(type);
  }

  get selectedType(): FormGroup {
    return this.singleQuestion.get('selectedType') as FormGroup;
  }


}
