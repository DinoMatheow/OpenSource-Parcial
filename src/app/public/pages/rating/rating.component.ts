import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {

private fb = inject(FormBuilder);
formUtils = FormBuilder;

myForm: FormGroup = this.fb.group({
  name: ['', Validators.required],
  ticket: ['', [Validators.required, Validators.email]]

});

}
