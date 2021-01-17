import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFormComponent {
  dashboardForm: FormGroup;

  @Output() onSubmitValue = new EventEmitter<object>();

  constructor(private formBuilder: FormBuilder) {
    this.form();
  }

  form() {
    this.dashboardForm = this.formBuilder.group({
      flow: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
      ]),
      pressure: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
      ]),
    });
  }

  onSubmit(ev): void {
    if (this.dashboardForm.invalid)
      return this.dashboardForm.markAllAsTouched();

    this.onSubmitValue.emit(this.dashboardForm.value);

  }
  resetForm(): void {
    this.form();
  }
}
