import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'trainer-client-nav',
  templateUrl: './trainer-client-nav.component.html',
  styleUrls: ['./trainer-client-nav.component.scss']
})
export class TrainerClientNavComponent implements OnInit {

  userId;
  clientId;



  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.route.params.subscribe((params) => this.clientId = params.clientId);
  }

  navigate(section, toggleEl) {
    const link = `/trainer/${this.userId}/clients/${this.clientId}`;

    if (section === 'main') {
      this.router.navigateByUrl(`/trainer/${this.userId}/feed`);
    } else {
      this.router.navigateByUrl(`${link}/${section}`);
    }

    toggleEl.click();
  }


}
