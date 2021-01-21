import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() logIn: boolean;
  @Input() signUp: boolean;
  @Output() formSignUpEvent = new EventEmitter<boolean>();
  @Output() formLogInEvent = new EventEmitter<boolean>();
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.signUp === true) {
      this.validateForm.value.remember = false;
    }
    console.log(this.validateForm.value);
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.validateForm = this.fb.group({
      correo: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null],
      lastname: [null],
      cellphonenumber: [null],
      remember: true,
    });
  }

  ngOnChanges(changes: any) {
    // changes.prop contains the old and the new value...
    // console.log(changes.signUp.currentValue);

    if (changes.signUp.currentValue === true) {
      this.validateForm.reset();
      this.validateForm.markAsUntouched();
      this.validateForm.controls['name'].setValidators([Validators.required]);
      this.validateForm.controls['lastname'].setValidators([
        Validators.required,
      ]);
      this.validateForm.controls['cellphonenumber'].setValidators([
        Validators.required,
      ]);
    }
  }

  onFormSignUpChange(value) {
    this.formSignUpEvent.emit(value);
  }

  onFormLogInChange(value) {
    this.formLogInEvent.emit(value);
  }
}
