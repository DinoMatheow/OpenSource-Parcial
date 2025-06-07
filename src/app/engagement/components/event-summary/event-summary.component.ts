import { ChangeDetectionStrategy, Component } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-event-summary',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './event-summary.component.html',
  styleUrl: './event-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSummaryComponent { }
