import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Breed } from '../interfaces/breed.interface'; 

@Injectable({
  providedIn: 'root'
})

export class BreedService {
  breedList:any;
  constructor(private http: HttpClient) { }
  
  getBreed(): Observable<Breed[]> {
    return this.breedList = this.http.get<Breed[]>(`https://api.thecatapi.com/v1/breeds`)
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}