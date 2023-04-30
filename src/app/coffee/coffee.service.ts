import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { enviroment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { Coffee } from './coffee';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {

  private apiUrl: string = enviroment.baseUrl

  constructor(private http: HttpClient) {}

  getCoffees(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(this.apiUrl);
  }
}
