import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CrudService } from '../crud.service';

describe('CrudService', () => {
  let httpMock: HttpTestingController;
  let crudService: CrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    crudService = TestBed.inject(CrudService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all resources from API via GET', () => {
    const expectedResponse = [
      { id: 1, name: 'Resource 1' },
      { id: 2, name: 'Resource 2' },
      { id: 3, name: 'Resource 3' }
    ];

    crudService.findAll().subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${crudService.resource}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should retrieve a resource from API by ID via GET', () => {
    const id = 1;
    const expectedResponse = { id: id, name: 'Resource 1' };

    crudService.findById(id).subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${crudService.resource}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should create a resource via POST', () => {
    const newResource = { name: 'New Resource' };
    const expectedResponse = { id: 4, name: 'New Resource' };

    crudService.save(newResource).subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${crudService.resource}`);
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });

  it('should delete a resource from API by ID via DELETE', () => {
    const id = 1;

    crudService.delete(id).subscribe((response: any) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${crudService.resource}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should retrieve all resources from API via GET without pagination', () => {
    spyOn(console, 'warn');
    const expectedResponse = [
      { id: 1, name: 'Resource 1' },
      { id: 2, name: 'Resource 2' },
      { id: 3, name: 'Resource 3' }
    ];

    crudService.findAllNoPage().subscribe((response: any) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${crudService.resource}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);

    expect(console.warn).toHaveBeenCalledWith(jasmine.stringMatching(/findAllNoPage/));
  });

});
