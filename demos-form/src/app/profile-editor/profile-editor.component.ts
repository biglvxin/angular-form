import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {
  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),

  //   }),
  // });
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control(''),
    ]),
  })
  constructor(private fb: FormBuilder) {
   }

  ngOnInit(): void {
    console.log(this.profileForm.controls);
    // console.log(this.profileForm.get('address').controls);
   
  }

  submitForm() {
    console.log(this.profileForm);
    console.log(this.profileForm.valid);
    console.log(this.profileForm.value);
  }
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'lvxin',
      address: {
        street: 'test'
      }
    })
  }
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

}
