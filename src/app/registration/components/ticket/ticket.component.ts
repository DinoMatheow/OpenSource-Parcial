import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, catchError, tap, finalize } from 'rxjs';
import { Rating } from '../../interfaces/rating.interface';
import { RatingService } from '../../services/rating.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ticket',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketComponent {  private fb = inject(FormBuilder);
  private ratingService = inject(RatingService);
  private snackBar = inject(MatSnackBar);

  // Estado
  isLoading = signal<boolean>(false);

  // Formulario
  myForm: FormGroup = this.fb.group({
    ticket: ['', Validators.required],
    rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
  });

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.snackBar.open('Por favor, complete todos los campos correctamente', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.isLoading.set(true);
    const { ticket, rating } = this.myForm.value;

    this.ratingService.verifyTicket(ticket!)
      .pipe(
        switchMap(attendees => {
          const attendee = attendees[0];

          if (!attendee) {
            throw new Error('INVALID_TICKET');
          }

          if (!attendee.checkedInAt) {
            throw new Error('NOT_ATTENDED');
          }

          // Verificar si ya calificó este evento
          return this.ratingService.getRatingsByAttendeeAndEvent(attendee.id, attendee.eventId).pipe(
            switchMap(existingRatings => {
              if (existingRatings.length > 0) {
                throw new Error('ALREADY_RATED');
              }

              const newRating: Rating = {
                attendeeId: attendee.id,
                eventId: attendee.eventId,
                rating: Number(rating),
                ratedAt: new Date()
              };

              return this.ratingService.createRating(newRating);
            })
          );
        }),

        catchError(error => {
          let message = 'Error al calificar el evento';

          switch (error.message) {
            case 'INVALID_TICKET':
              message = 'Identificador de ticket inválido';
              break;
            case 'NOT_ATTENDED':
              message = 'Solo puedes calificar eventos a los que hayas asistido';
              break;
            case 'ALREADY_RATED':
              message = 'Ya calificaste este evento';
              break;
          }

          this.snackBar.open(message, 'Cerrar', {
            duration: 5000
          });

          throw error;
        }),

        tap(() => {
          this.snackBar.open('Evento calificado exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.myForm.reset();
        }),

        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }
}
