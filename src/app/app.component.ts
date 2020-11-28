import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  urlaubstageForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.urlaubstageForm = this.formBuilder.group({
      urlaub: ['', [Validators.required, Validators.pattern('^[0-9.,]+$')]],
      sonderurlaube: this.formBuilder.array([
        this.initSonderurlaub()
      ])
    });
  }

  get sonderurlaubForms() {
    return this.urlaubstageForm.get('sonderurlaube') as FormArray
  }

  initSonderurlaub() {
    return this.formBuilder.group({
      anzahlTage: ['', Validators.required],
      anmerkung: ['', Validators.required]
    });
  }

  addSonderurlaub() {
    const control = <FormArray>this.urlaubstageForm.controls['sonderurlaube'];
    const sonderurlaub = this.formBuilder.group({
      anzahlTage: ['', Validators.required],
      anmerkung: ['', Validators.required]
    });

    control.push(sonderurlaub);
  }

  removevalidation(){
    const control = this.sonderurlaubForms.controls;
        for(let i = control.length-1; i >= 0; i--) {
            this.sonderurlaubForms.removeAt(i)
    }

  }

  deleteSonderurlaub(i) {
    this.sonderurlaubForms.removeAt(i)
  }

  async submitHandler() {
    
    //delete this.sonderurlaubForms.value[0].anzahlTage;
    this.submitted = true;
    // stop here if form is invalid
    if (this.urlaubstageForm.invalid) {
      return;
    }
    
    console.log(JSON.stringify(this.sonderurlaubForms.value));
    console.log(this.sonderurlaubForms.value[0].anzahlTage);

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.urlaubstageForm.controls;
  }

}
