import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EventsService } from '../../services/events.service';
import { Events } from '../../interfaces/events.interface';
import { Attendes } from '../../interfaces/attendes.interface';
import { AttendesService } from '../../services/attendees.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './event-summary.component.html',
  styleUrl: './event-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSummaryComponent {
  private eventService = inject(EventsService);
  private attendesService = inject(AttendesService);

  event = input.required<Events>();
  attendees = input<Attendes | null>(null);

  // Recurso para obtener el conteo de asistentes
  attendeesCountResource = rxResource({
    request: () => ({ eventId: this.event().id }),
    loader: ({ request }) => this.attendesService.getAttendeesCountByEvent(request.eventId)
  });
}
