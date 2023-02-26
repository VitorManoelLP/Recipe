import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './core/crud.service';

@Injectable()
export class AuthenticationService extends CrudService {

  constructor(public override httpClient: HttpClient) {
    super(httpClient);
    this.resource = '/api/authentication'
  }

  public login(user: any):Observable<any> {
    return this.httpClient.post(`${this.resource}/login`, user);
  }

}
