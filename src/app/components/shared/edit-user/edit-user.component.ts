import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  validateForm!: FormGroup;
  @Input() editUser: boolean; // decorate the property with @Input()
  @Input() registerUser: boolean;
  @Output() signUpEvent = new EventEmitter<boolean>();
  @Output() logInEvent = new EventEmitter<boolean>();

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // console.log(this.validateForm.value);
    if (this.editUser === true) {
      this.onSignUpChange(this.validateForm.value);
      this.validateForm.reset();
    } else {
      this.onLogInChange(this.validateForm.value);
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    return (this.validateForm = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cellphonenumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ],
      ],
    }));
  }

  ngOnChanges(changes: any) {
    if (changes.editUser === true) {
      this.validateForm.addControl(
        'password',
        this.fb.control('', [Validators.required])
      );
    }
    if (changes.registerUser === true) {
      if (this.validateForm) {
        this.validateForm.addControl('password', this.fb.control('true'));
      }
    }
  }

  onSignUpChange(value) {
    this.signUpEvent.emit(value);
  }

  onLogInChange(value) {
    this.logInEvent.emit(value);
  }
}
