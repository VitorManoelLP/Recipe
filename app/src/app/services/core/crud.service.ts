import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export abstract class CrudService {

  resource: string = "";

  constructor(public httpClient: HttpClient) { }

  public findById(id: any): Observable<any> {
    return this.httpClient.get(`${this.resource}/${id}`);
  }

  public save(object: any):Observable<any> {
    return this.httpClient.post(`${this.resource}`, object);
  }

  public findAll():Observable<any> {
    return this.httpClient.get(`${this.resource}`)
      .pipe(map((json:any) => json.content));
  }

  /**
  * @deprecated A chamada desse método deve ser realizada com cautela,
  *   visto que o uso do método findAll sem paginação é considerado um anti-padrão.
  *   Isso se deve ao fato de que ele pode retornar uma grande quantidade de dados,
  *   o que pode resultar em uma baixa performance e um alto consumo de recursos,
  *   comprometendo o desempenho da aplicação."
  */
  public findAllNoPage():Observable<any> {
    return this.httpClient.get(`${this.resource}`);
  }

  public delete(id:any):Observable<any> {
    return this.httpClient.delete(`${this.resource}/${id}`);
  }


}
