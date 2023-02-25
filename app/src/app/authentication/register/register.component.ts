import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sameValue } from 'src/app/shared/validators/same-value';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {

    const form = this._formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.maxLength(254),
        Validators.email
      ]],
      password: ['', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(LoginComponent.PATTERN_PASSWORD)
      ]],
      confirmPassword: ['', Validators.compose([Validators.required, sameValue('password')])]
    });

    return form;
  }

  public register() {
    this.form.reset();
    this.form.clearValidators();
  }

}
