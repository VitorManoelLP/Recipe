import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { GlobalExceptionHandlerComponent } from './handler.component';
import { GlobalExceptionHandler } from './exception-handler';
import { ModalActionsService } from '../modal/modal.service';
import { of } from 'rxjs';

describe('GlobalExceptionHandlerComponent', () => {

  let component: GlobalExceptionHandlerComponent;
  let fixture: ComponentFixture<GlobalExceptionHandlerComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockExceptionHandler: jasmine.SpyObj<GlobalExceptionHandler>;
  let mockModalActions: jasmine.SpyObj<ModalActionsService>;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockExceptionHandler = jasmine.createSpyObj('GlobalExceptionHandler', ['listenEvent']);
    mockModalActions = jasmine.createSpyObj('ModalActionsService', ['openModal']);

    await TestBed.configureTestingModule({
      declarations: [ GlobalExceptionHandlerComponent ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: GlobalExceptionHandler, useValue: mockExceptionHandler },
        { provide: ModalActionsService, useValue: mockModalActions }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalExceptionHandlerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to GlobalExceptionHandler listenEvent', () => {
    const testError = 'Test error message';
    mockExceptionHandler.listenEvent.and.returnValue(of(testError));

    fixture.detectChanges();

    expect(component.errorMessage).toEqual(testError);
  });

  it('should open a modal with error message', () => {
    const testError = 'Test error message';
    component.errorMessage = testError;

    fixture.detectChanges();

    expect(mockModalActions.openModal).toHaveBeenCalledWith('Oops, algo deu errado!', testError, 'error');
  });
});

