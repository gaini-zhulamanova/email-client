import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: Email;

  constructor(
    private route: ActivatedRoute,
  ) {
    // to be 100% sure that the email will be fetched before rendering the template we can use snapshot
    // to avoid the error "...smth is undefined"
    //this.email = this.route.snapshot.data.email;
    this.route.data.subscribe(({email}) => {
      this.email = email;
    });
  }

  ngOnInit(): void {

  }
}
