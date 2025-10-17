import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMessage } from 'src/app/interfaces/message.interface';

@Component({
  selector: 'app-smart-chat',
  templateUrl: './smart-chat.page.html',
  styleUrls: ['./smart-chat.page.scss'],
  standalone:  false,
})
export class SmartChatPage implements OnInit {

  messages: IMessage[] = [];
  
  promt!: FormControl;
  formChat!: FormGroup;
  constructor() {
    this.initForm();
   }

  ngOnInit() {
  }

  private initForm(){
    this.promt = new FormControl('');

    this.formChat = new FormGroup({
      promt: this.promt,
    })
  }

  askToGpt(){
    console.log(this.formChat.value);

  }

}
