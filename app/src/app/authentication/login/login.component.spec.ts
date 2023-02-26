import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with email and password controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should make the email control required', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the password control required', () => {
    const control = component.form.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the email control have a maximum length of 254', () => {
    const control = component.form.get('email');
    control?.setValue('a'.repeat(255));
    expect(control?.valid).toBeFalsy();
  });

  it('should make the email control have a valid email address', () => {
    const control = component.form.get('email');
    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the password control have a minimum length of 8', () => {
    const control = component.form.get('password');
    control?.setValue('1234567');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the password control have at least one uppercase, one lowercase, one digit and one special character', () => {
    const control = component.form.get('password');
    control?.setValue('invalid-password');
    expect(control?.valid).toBeFalsy();
  });

  it('should reset the form and clear the validators when the login button is clicked', () => {
    spyOn(component.form, 'reset');
    spyOn(component.form, 'clearValidators');
    component.login();
    expect(component.form.reset).toHaveBeenCalled();
    expect(component.form.clearValidators).toHaveBeenCalled();
  });
});
