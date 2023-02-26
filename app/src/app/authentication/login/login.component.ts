import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static readonly PATTERN_PASSWORD = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+-=]).{8,}$';

  hide = true;
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {

    const form = this._formBuilder.group({
      id: [''],
      email: ['', [
        Validators.required,
        Validators.maxLength(254),
        Validators.email
      ]],
      password: ['', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(LoginComponent.PATTERN_PASSWORD)
      ]]
    });

    return form;
  }

  public login() {
    this._authenticationService.login(this.form.getRawValue()).subscribe(resp => {
      this.form.reset();
    });
  }

}
