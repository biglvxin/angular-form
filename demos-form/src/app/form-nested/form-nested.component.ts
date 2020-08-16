import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-nested',
  templateUrl: './form-nested.component.html',
  styleUrls: ['./form-nested.component.css']
})
export class FormNestedComponent implements OnInit {
  public validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      workFlowName: [null, [Validators.required]],
      workFlowType: [null, [Validators.required]],
      workFlowContent: this.fb.array([
        // this.fb.control(null)
        this.fb.group({
          stageName:[null, [Validators.required]],
          stageType: [null, [Validators.required]],
          stageContent: this.fb.array([
            this.fb.control(null)
          ])
        })
      ])
    });
    console.log(this.validateForm);
  }
  addStage() {
    this.workFlowContent.push(
      this.fb.group({
        stageName: [null, [Validators.required]],
        stageType: [null, [Validators.required]],
        stageContent: this.fb.array([
          this.fb.control(null)
        ]),
      })
    );
  }
  get workFlowContent() {
    return this.validateForm.get('workFlowContent') as FormArray;
  }

}
