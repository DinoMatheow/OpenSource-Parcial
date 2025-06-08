import { HttpClient } from '@angular/common/http';
import { inject, Injectable, input, signal } from '@angular/core';
import { Rating } from '../interfaces/rating.interface';
import { Observable, tap } from 'rxjs';

const baseUrl = 'http://localhost:3000/ratings';

@Injectable({providedIn: 'root'})
export class RatingService {

http = inject(HttpClient);

rating = signal<Rating[]>([]);


getRating(params: {_limit: number}): Observable<Rating[]>{
  return this.http.get<Rating[]>(baseUrl, {
    params: params || {_limit : 3}
  }).pipe(
    tap(resp => {
      this.rating.set(resp);
    })

  )

};









}