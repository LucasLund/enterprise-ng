import {
  Component,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import {
  SohoModalDialogService,
  SohoModalDialogRef
} from '@infor/sohoxi-angular';

import { ExampleModalDialogComponent } from './example-modal-dialog.component';
import { NestedModalDialogComponent } from './nested-modal-dialog.component';
import { VetoableModalDialogComponent } from './vetoable-modal-dialog.component';

@Component({
  selector: 'soho-modal-dialog.demo',
  templateUrl: './modal-dialog.demo.html'
})
export class ModalDialogDemoComponent {
  /**
   * The 'dialogPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('dialogPlaceholder', { read: ViewContainerRef })
  placeholder: ViewContainerRef;

  /**
   * The interface to an instantiated instance of the ExampeDialogComponent.
   */
  public dialogRef: SohoModalDialogRef<any>;

  public closeResult: string;

  public title = 'Example Modal Dialog';
  public isAlert = true;

  /**
   * Constructor.
   *
   * @param dialogService - the modal dialog service.
   */
  constructor(private modalService: SohoModalDialogService) {
  }

  openSimple() {
    const buttons = [
      { text: 'Cancel', click: (e, modal) => { modal.close(true); } },
      { text: 'Submit', click: (e, modal) => { modal.close(true); }, isDefault: true }];

    this.dialogRef = this.modalService
      .modal(ExampleModalDialogComponent, this.placeholder)
      .buttons(buttons)
      .title(this.title)
      .isAlert(this.isAlert)
      .apply((c) => { c.headerText = 'Header Text Update!!'; })
      .open();

    // Attach a listener to the afterclose event, which also gives you the result - if available.
    this.dialogRef.afterClose(result => {
      this.closeResult = result;
      this.dialogRef = null;
    });
  }

  openNested() {
    this.dialogRef = this.modalService
      .modal(NestedModalDialogComponent, this.placeholder)
      .buttons(
      [{ text: 'Cancel', click: (e, modal) => { modal.close(true); } },
      { text: 'Submit', click: (e, modal) => { modal.close(true); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose(result => {
        this.closeResult = result;
        this.dialogRef = null;
      });
  }

  openMessage() {
    this.dialogRef = this.modalService
      .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
      .buttons(
      [{ text: 'Cancel', click: (e, modal) => { modal.close(true); } },
      { text: 'Submit', click: (e, modal) => { modal.close(true); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose(result => {
        this.closeResult = result;
        this.dialogRef = null;
      });
  }

  openVeotable() {
    this.dialogRef = this.modalService
      .modal(VetoableModalDialogComponent, this.placeholder)
      .buttons(
      [{ text: 'Cancel', click: (e, modal) => { modal.close(true); } },
      { text: 'Submit', click: (e, modal) => { modal.close(true); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose(result => {
        this.closeResult = result;
        this.dialogRef = null;
      });
  }

  openDialogResult() {
    this.dialogRef = this.modalService
      .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
      .buttons(
       [{ text: 'YES', click: () => { this.dialogRef.close('YES'); } },
        { text: 'NO', click: () => { this.dialogRef.close('NO'); }, isDefault: true }])
      .title(this.title)
      .open()
      .afterClose(result => {
        alert(`You selected ${result}`);
        this.closeResult = result;
        this.dialogRef = null;
      });
  }
}
