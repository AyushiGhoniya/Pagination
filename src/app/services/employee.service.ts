import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../modals/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _url: string ="http://localhost:3000/posts?_page=";

  constructor(private http: HttpClient) { }

  getEmployees(page: number ,sortBy: string ,limit: number): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this._url + page + '&_limit=' + limit + '&_sort=' + sortBy);
  }
}
