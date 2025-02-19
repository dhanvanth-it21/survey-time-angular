import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  

  questionType!: string;

  singleQuestion!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.singleQuestion = this.formBuilder.group({
      question: [''],
      tpye: [FormGroup],
      selectedType: [FormGroup],
      isRequired: [false],
    });
  }

  handleSelection(type: string) {
    this.questionType = type;
  }

}
