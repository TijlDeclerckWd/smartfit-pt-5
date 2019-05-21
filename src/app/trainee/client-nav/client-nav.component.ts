import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'client-nav',
  templateUrl: './client-nav.component.html',
  styleUrls: ['./client-nav.component.scss']
})
export class ClientNavComponent implements OnInit {

  userId;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }

  logout() {
    localStorage.clear();
  }

  navigate(section, toggleEl) {
    const link = `/client/${this.userId}`;

    if (section === 'main') {
      this.router.navigateByUrl(`/client/${this.userId}/feed`);
    } else {
      this.router.navigateByUrl(`${link}/${section}`);
    }

    toggleEl.click();
  }
}
