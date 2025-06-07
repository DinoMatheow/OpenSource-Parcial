import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/Footer/Footer.component';
import { ToolbarComponent } from '../../components/Toolbar/Toolbar.component';

@Component({
  selector: 'app-public-layouts',
  imports: [RouterOutlet, FooterComponent, ToolbarComponent],
  templateUrl: './public-layouts.component.html',
  styleUrl: './public-layouts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayoutsComponent {



}
