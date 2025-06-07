import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective
} from "@ngx-translate/core";


@Component({
  selector: 'app-toolbar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule,
    MatButtonToggleModule, MatDividerModule, RouterLink],
  templateUrl: './Toolbar.component.html',
  styleUrl: './Toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
translate = inject(TranslateService);


  constructor() {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');


}

changeLang(lang: string) {
  this.translate.use(lang);
}


}
