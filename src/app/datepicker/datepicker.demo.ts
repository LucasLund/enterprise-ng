import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SohoDatePickerComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-datepicker-demo',
  templateUrl: './datepicker.demo.html'
})
export class DatepickerDemoComponent implements OnInit {

  @ViewChild(SohoDatePickerComponent) datepicker: SohoDatePickerComponent;

  public model = {
    standard: '12/12/2016',
    anniversary: '',
    birthday: '',
    year: '',
    datetime: ''
  };
  public showModel: boolean = false;
  public datepickerDisabled: boolean = false;
  public datepickerReadOnly: boolean = false;

  constructor() { }
  ngOnInit() { }
  toggleModel() {
    this.showModel = !this.showModel;
  }
  onChange(event: SohoDatePickerEvent) {
    console.log('DatePickerDemoComponent.onChange: type=' + event.type);
  }
  setEnable() {
// TODO: waiting on SOHO-4834
    this.datepicker.disabled = false;
    this.datepickerDisabled = this.datepicker.disabled;
    this.datepickerReadOnly = this.datepicker.readonly;
  }
  setDisable() {
// TODO: waiting on SOHO-4834
    this.datepicker.disabled = true;
    this.datepickerDisabled = this.datepicker.disabled;
  }
  setReadonly() {
// TODO: waiting on SOHO-4834
    this.datepicker.readonly = true;
    this.datepickerReadOnly = this.datepicker.readonly;
  }
}
