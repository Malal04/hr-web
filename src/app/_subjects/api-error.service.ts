import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {

  apiError = new Subject<string>();

  constructor() { }

  sendError(message: string): void {
    this.apiError.next(message);
    setTimeout(() => this.apiError.next(''), 3000);
  }

  // getError(): Observable<string> {
  //   return this.apiError.asObservable();
  // }
  
}
