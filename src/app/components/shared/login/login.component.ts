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
  @Output() signUpEvent = new EventEmitter<boolean>();
  @Output() logInEvent = new EventEmitter<boolean>();
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.signUp === true) {
      this.onSignUpChange(this.validateForm.value);
      this.validateForm.reset();
    } else {
      this.onLogInChange(this.validateForm.value);
      this.validateForm.reset();
    }
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    return (this.validateForm = this.fb.group({
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    }));
  }

  ngOnChanges(changes: any) {
    // changes.prop contains the old and the new value...
    // console.log(changes.signUp.currentValue);

    if (changes.signUp.currentValue === true) {
      this.validateForm.addControl(
        'name',
        this.fb.control('', [Validators.required])
      );
      this.validateForm.addControl(
        'lastname',
        this.fb.control('', [Validators.required])
      );
      this.validateForm.addControl(
        'cellphonenumber',
        this.fb.control('', [Validators.required])
      );
      this.validateForm.removeControl('remember');
    }
    if (changes.logIn.currentValue === true) {
      if (this.validateForm) {
        this.validateForm.removeControl('name');
        this.validateForm.removeControl('lastname');
        this.validateForm.removeControl('cellphonenumber');
        this.validateForm.addControl('remember', this.fb.control('true'));
      }
    }
  }

  onFormSignUpChange(value) {
    this.formSignUpEvent.emit(value);
  }

  onFormLogInChange(value) {
    this.formLogInEvent.emit(value);
  }

  onSignUpChange(value) {
    this.signUpEvent.emit(value);
  }

  onLogInChange(value) {
    this.logInEvent.emit(value);
  }
}
