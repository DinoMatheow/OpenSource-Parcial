import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Events } from '../interfaces/events.interface';

const baseUrl = 'http://localhost:3000/events';

@Injectable({providedIn: 'root'})
export class EventsService {
  private http = inject(HttpClient);
  private events = signal<Events[]>([]);

  // Getter para acceder al signal de forma segura
  get eventsState() {
    return this.events.asReadonly();
  }

  getEvents(params?: { _limit: number }): Observable<Events[]> {
    return this.http.get<Events[]>(baseUrl, {
      params: params || { _limit: 3 }
    }).pipe(
      tap(events => {
        // Actualizamos el signal con los nuevos eventos
        this.events.set(events);
      })
    );
  }
}
