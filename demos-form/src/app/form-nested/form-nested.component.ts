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
            // this.fb.control(null)
            this.fb.group({
              stepName: [null, [Validators.required]],
              stepType: [null, [Validators.required]],
              stepContent: this.fb.array([
                this.fb.control(null)
              ])
            })
          ])
        })
      ])
    });
    console.log(this.validateForm);
  }
  addStep(workflowIndex: number) {
    (this.workFlowContent.at(workflowIndex).get('stageContent') as FormArray).push(
      this.fb.group({
        stepName: [null, [Validators.required]],
        stepType: [null, [Validators.required]],
        stepContent: this.fb.array([
          this.fb.control(null)
        ])
      }));
  }
  addStage() {
    this.workFlowContent.push(
      this.fb.group({
        stageName: [null, [Validators.required]],
        stageType: [null, [Validators.required]],
        stageContent: this.fb.array([
          // this.fb.control(null)
          this.fb.group({
            stepName: [null, [Validators.required]],
            stepType: [null, [Validators.required]],
            stepContent: this.fb.array([
              this.fb.control(null)
            ])
          })
        ]),
      })
    );
  }
  addStepContent(stage: FormGroup) {
    (stage.get('stepContent') as FormArray).push(this.fb.control(null));
  }
  removeStage(workflowIndex: number) {
      this.workFlowContent.removeAt(workflowIndex);
  }
  removeStep(workflowIndex: number, stageIndex: number) {
    (this.workFlowContent.at(workflowIndex).get('stageContent') as FormArray).removeAt(stageIndex);
  }
  removeStepContent(stage: FormGroup, stepIndex: number) {
    (stage.get('stepContent') as FormArray).removeAt(stepIndex);
  }
  addWorkFlow(): void {
    this.workFlowContent.push(
      this.fb.group({
        stageName: [null, [Validators.required]],
        stageType: [null, [Validators.required]],
        stageContent: this.fb.array([
          this.fb.group({
            stepName: [null, [Validators.required]],
            stepType: [null, [Validators.required]],
            stepContent: this.fb.array([
              this.fb.control(null)
            ])
          })
        ]),
      })
    );
  }
  get workFlowContent() {
    return this.validateForm.get('workFlowContent') as FormArray;
  }

}
