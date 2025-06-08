import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EventSummaryComponent } from '../../../engagement/components/event-summary/event-summary.component';
import {rxResource} from '@angular/core/rxjs-interop'
import { EventsService } from '../../../engagement/services/events.service';
import { AttendesService } from '../../../engagement/services/attendees.service';
import { RatingService } from '../../../registration/services/rating.service';
@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, MatCardModule,MatGridListModule, TranslatePipe, EventSummaryComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

translate = inject(TranslateService);
private eventsService = inject(EventsService);
private attendesService = inject(AttendesService);
private ratingService = inject(RatingService);

limit = signal(10);

 eventsResource = rxResource({
  request: () => ({limit: this.limit()}),
  loader: ({request}) =>
    {
    return   this.eventsService.getEvents({_limit: request.limit})
}
});


attendesResource = rxResource({
  request: () => ({ _limit: this.limit() }),
  loader: ({ request }) => {
    return this.attendesService.getAtttende(request);
  }
});

ratingResource = rxResource({
    request: ()=> ({_limit: this.limit()}),
    loader: ({request}) => {
      return this.ratingService.getRating(request);
    }
});



}
