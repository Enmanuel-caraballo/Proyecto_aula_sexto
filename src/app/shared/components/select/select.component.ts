import { Component, Input, OnInit } from '@angular/core';
import { OptionsS } from '../../services/options-s';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false,
})
export class SelectComponent  implements OnInit {

  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();

   itemSelect: {title: string, value: string} [] = [];

  constructor(private readonly optionSrv: OptionsS) { }

  ngOnInit() {
    this.optionSrv.getMenu().subscribe(item =>{
      this.itemSelect = item
    })
  }

  public onSelect(event: any){
    this.control.setValue(event.detail.value);
    this.control.markAllAsTouched();
  }

}
