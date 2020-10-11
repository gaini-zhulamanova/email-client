import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  // here we only declare emailForm. We initialize it inside ngOnInit
  emailForm: FormGroup;

  @Input() email: Email;

  @Output() emailSubmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // we can have access to the child properties only inside ngOnInit (not in the constructor)
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    });
  }

  onSubmit() {
    if(this.emailForm.invalid) {
      return;
    }
    
    this.emailSubmit.emit(this.emailForm.value);

  }

}
