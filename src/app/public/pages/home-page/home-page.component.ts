import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EventSummaryComponent } from '../../../engagement/components/event-summary/event-summary.component';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, MatCardModule,MatGridListModule, TranslatePipe, EventSummaryComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

translate = inject(TranslateService);


}
