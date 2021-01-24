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
  @Input() resetForm: boolean;
  @Output() formSignUpEvent = new EventEmitter<boolean>();
  @Output() formLogInEvent = new EventEmitter<boolean>();
  @Output() signUpEvent = new EventEmitter<boolean>();
  @Output() logInEvent = new EventEmitter<boolean>();
  validateForm!: FormGroup;
  remember = false;
  correo: string;

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
      this.emailIsSaved();
    }
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.emailIsSaved();
    this.initializeForm();
  }

  emailIsSaved() {
    if (localStorage.getItem('correo')) {
      this.correo = localStorage.getItem('correo');
      this.remember = true;
    } else {
      this.correo = '';
      this.remember = false;
    }
  }

  initializeForm() {
    return (this.validateForm = this.fb.group({
      correo: [
        this.correo,
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
      remember: [this.remember],
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
        this.fb.control('', [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ])
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

    this.emailIsSaved();
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
