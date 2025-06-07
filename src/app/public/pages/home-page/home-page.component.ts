import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EventSummaryComponent } from '../../../engagement/components/event-summary/event-summary.component';
import {rxResource} from '@angular/core/rxjs-interop'
import { EventsService } from '../../../engagement/services/events.service';
@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, MatCardModule,MatGridListModule, TranslatePipe, EventSummaryComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

translate = inject(TranslateService);
eventsService = inject(EventsService);

limit = signal(4);

 eventsResource = rxResource({
  request: () => ({limit: this.limit()}),
  loader: ({request}) =>
    {
    return   this.eventsService.getEvents({_limit: request.limit})
}
});




}
