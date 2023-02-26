import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX } from 'src/app/shared/regex/regex';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const form = this._formBuilder.group({
      id: [''],
      email: [
        '',
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      password: [
        '',
        [
          Validators.minLength(8),
          Validators.required,
          Validators.pattern(REGEX.PASSWORD),
        ],
      ],
    });

    return form;
  }

  public login() {
    this.form.reset();
    this.form.clearValidators();
  }
}
