import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StoreUser } from '../Models';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void { }
  onSubmit(ev): void {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();

    this.loginService
      .authUser(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.route.navigateByUrl('/dashboard');
        })
      )
      .subscribe(
        (res) => {
          if (res.token) {
            let user: StoreUser = {
              email: this.loginForm.value.email,
              token: res.token
            }
            localStorage.setItem('userLogin', JSON.stringify(user))
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  openRegistrationForm() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
