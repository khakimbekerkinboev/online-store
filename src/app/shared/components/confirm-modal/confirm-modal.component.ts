import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() modalMessage = '';
  @Input() actionButton = '';
  @Output() actionDone = new EventEmitter();
  @Output() modalClosed = new EventEmitter();

  doAction() {
    this.actionDone.emit();
  }

  closeModal() {
    this.modalClosed.emit();
  }

  closeModalByBackdrop(event: Event) {
    const clickedItem = event.target as HTMLElement;
    if (clickedItem.classList.contains('modal')) {
      this.modalClosed.emit();
    }
  }
}
