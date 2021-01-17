import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { LoginService } from '../../login.service';
import { PasswordValidation } from '../../password-validator';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
})
export class RegistrationDialogComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.registrationForm = this.formBuilder.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validator: PasswordValidation.MatchPassword,
      }
    );
  }

  ngOnInit(): void {}

  onSubmitRegistration(ev): void {
    console.log(this.registrationForm.value);
    if (this.registrationForm.invalid)
      return this.registrationForm.markAllAsTouched();
    this.loginService
      .registerUser(this.registrationForm.value)
      .pipe(
        finalize(() => {
          this.onClose();
        })
      )
      .subscribe(
        (res) => {},
        (error) => {
          console.log(error);
        }
      );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
