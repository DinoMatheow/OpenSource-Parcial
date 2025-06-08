import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Rating } from '../interfaces/rating.interface';
import { map, Observable, tap } from 'rxjs';

const baseUrl = 'http://localhost:3000/ratings';

@Injectable({providedIn: 'root'})
export class RatingService {

http = inject(HttpClient);

ratingInterface = signal<Rating[]>([]);


getRating(params: {_limit: number}): Observable<Rating[]>{
  return this.http.get<Rating[]>(baseUrl, {
    params: params || {_limit : 3}
  }).pipe(
    tap(resp => {
      this.ratingInterface.set(resp);
    })

  )

};


getAverageRating(eventId: string): Observable<number | null> {
  return this.http.get<Rating[]>(baseUrl).pipe(
    map(ratings => {
      // Filtrar ratings del evento específico
      const eventRatings = ratings.filter(r => r.eventId === eventId);

      // Si no hay ratings, retornar null
      if (eventRatings.length === 0) return null;

      // Calcular promedio
      const sum = eventRatings.reduce((acc, curr) => acc + curr.rating, 0);
      const average = sum / eventRatings.length;

      // Redondear a un decimal
      return Math.round(average * 10) / 10;
    })
  );
}







}