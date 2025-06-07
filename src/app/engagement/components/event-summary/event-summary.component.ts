import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { EventsService } from '../../services/events.service';
import { Events } from '../../interfaces/events.interface';

@Component({
  selector: 'app-event-summary',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './event-summary.component.html',
  styleUrl: './event-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSummaryComponent {

  eventService = inject(EventsService);

  events = input.required<Events>();

}
