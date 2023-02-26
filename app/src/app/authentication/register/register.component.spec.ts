import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { sameValue } from '../shared/validators/same-value';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ RegisterComponent ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with required fields', () => {
    const form = component.form;
    expect(form.contains('nome')).toBeTruthy();
    expect(form.contains('email')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
    expect(form.contains('confirmPassword')).toBeTruthy();
    expect(form.controls['nome'].valid).toBeFalsy();
    expect(form.controls['email'].valid).toBeFalsy();
    expect(form.controls['password'].valid).toBeFalsy();
    expect(form.controls['confirmPassword'].valid).toBeFalsy();
  });

  it('should validate if password and confirmPassword fields match', () => {
    const form = component.form;
    const password = form.controls['password'];
    const confirmPassword = form.controls['confirmPassword'];
    password.setValue('Password1');
    confirmPassword.setValue('Password1');
    expect(form.valid).toBeTruthy();
  });

  it('should validate if password and confirmPassword fields do not match', () => {
    const form = component.form;
    const password = form.controls['password'];
    const confirmPassword = form.controls['confirmPassword'];
    password.setValue('Password1');
    confirmPassword.setValue('Password2');
    expect(form.valid).toBeFalsy();
    expect(confirmPassword.hasError('sameValue')).toBeTruthy();
  });

  it('should clear form and validators on register', () => {
    const form = component.form;
    form.controls['nome'].setValue('John Doe');
    form.controls['email'].setValue('john.doe@example.com');
    form.controls['password'].setValue('Password1');
    form.controls['confirmPassword'].setValue('Password1');
    form.markAsDirty();
    expect(form.dirty).toBeTruthy();
    component.register();
    expect(form.pristine).toBeTruthy();
    expect(form.controls['nome'].value).toEqual('');
    expect(form.controls['email'].value).toEqual('');
    expect(form.controls['password'].value).toEqual('');
    expect(form.controls['confirmPassword'].value).toEqual('');
    expect(form.validator).toBeFalsy();
  });
});
