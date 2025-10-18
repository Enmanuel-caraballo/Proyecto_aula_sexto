import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { IMessage } from 'src/app/interfaces/message.interface';
import { Openai } from 'src/app/shared/services/openai/openai';
import { CustomValidators } from 'src/app/shared/services/validators/custom-validators';

@Component({
  selector: 'app-smart-chat',
  templateUrl: './smart-chat.page.html',
  styleUrls: ['./smart-chat.page.scss'],
  standalone:  false,
})
export class SmartChatPage implements OnInit {

  @ViewChild(IonContent, {static: false}) content!: IonContent;

  messages: IMessage[] = [];

  promt!: FormControl;
  formChat!: FormGroup;

  loading: boolean = false;

  constructor(private readonly openaiSrv: Openai) {
    this.initForm();
   }


  ngOnInit() {
  }

  private initForm(){
    this.promt = new FormControl('', [Validators.required, CustomValidators.noWhiteSpace]);

    this.formChat = new FormGroup({
      promt: this.promt,
    })
  }

  askToGpt(){

if (this.formChat.valid) {
  let prompt = this.formChat.value.promt as string;
  //Mensaje de usuario
  let userMsg: IMessage = { sender: 'me', content: prompt}
  this.messages.push(userMsg);


  //Mensaje del Gpt
  let botMsg: IMessage = { sender: 'bot', content: ''}
  this.messages.push(botMsg);

  this.scrollDown();
  this.formChat.reset();
  this.formChat.disable();



  this.loading = true;

  this.openaiSrv.senQuestion(prompt).subscribe({
    next: (res: any) => {


      this.loading = false;
      this.typeText(res.bot)
      this.formChat.enable();

    }, error(err: any) {
        console.log(err);

    },
  })
}
  }



  typeText(text: string){
    let textIndex = 0;
    let messagesLastIndex = this.messages.length -1;

    let interval = setInterval(() => {
      if(textIndex < text.length){
        this.messages[messagesLastIndex].content += text.charAt(textIndex);
        textIndex++;
      }else{
        clearInterval(interval);
        this.scrollDown();
      }
    }, 15)
  }

  scrollDown(){
    this.content.scrollToBottom(2000);
  }
}
