import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  pending: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
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
    this.pending = true;
    if (this.registrationForm.invalid)
      return this.registrationForm.markAllAsTouched();
    this.loginService
      .registerUser(this.registrationForm.value)
      .pipe(
        finalize(() => {
          this.pending = false;
          this.onClose();
        })
      )
      .subscribe(
        (res) => {
          this._snackBar.open('user registered successfully', 'close', {
            duration: 2000,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
