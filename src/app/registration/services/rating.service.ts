import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Rating } from '../interfaces/rating.interface';
import { map, Observable, tap } from 'rxjs';
import { Attendes } from '../../engagement/interfaces/attendes.interface';

const baseUrl = 'http://localhost:3000';
const ratingsUrl = `${baseUrl}/ratings`;
const attendesUrl = `${baseUrl}/attendees`;

@Injectable({ providedIn: 'root' })
export class RatingService {
  private http = inject(HttpClient);

  // Signal para almacenar ratings si los necesitas localmente
  readonly ratingInterface = signal<Rating[]>([]);

  // Obtener ratings con límite (por ejemplo, para mostrar en Home)
  getRating(params: { _limit: number }): Observable<Rating[]> {
    return this.http.get<Rating[]>(ratingsUrl, { params }).pipe(
      tap((resp) => this.ratingInterface.set(resp))
    );
  }

  // Calcular el promedio de ratings por evento
  getAverageRating(eventId: string): Observable<number | null> {
    return this.http.get<Rating[]>(ratingsUrl).pipe(
      map((ratings) => {
        const eventRatings = ratings.filter((r) => r.eventId === eventId);
        if (eventRatings.length === 0) return null;

        const sum = eventRatings.reduce((acc, curr) => acc + curr.rating, 0);
        const average = sum / eventRatings.length;
        return Math.round(average * 10) / 10;
      })
    );
  }

  // Verificar si el ticket existe en attendees
  verifyTicket(ticketId: string): Observable<Attendes[]> {
    return this.http.get<Attendes[]>(attendesUrl, {
      params: { ticketIdentifier: ticketId },
    });
  }

  // Crear una nueva calificación
  createRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(ratingsUrl, rating);
  }

  //NUEVO: Verificar si el attendee ya calificó ese evento
  getRatingsByAttendeeAndEvent(attendeeId: string, eventId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(ratingsUrl, {
      params: {
        attendeeId,
        eventId,
      },
    });
  }
}
