import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scheduled-event',
  templateUrl: './scheduled-event.component.html',
  styleUrls: ['./scheduled-event.component.scss']
})
export class ScheduledEventComponent implements OnInit {

  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rutrum leo leo, sit amet dignissim lectus ultricies non.' +
    ' Phasellus quam mauris, sagittis sed lectus in, blandit viverra diam. Donec euismod lacinia eros, quis consectetur urna bibendum nec. ' +
    'Aliquam ac nunc feugiat, sagittis turpis vel, tempor ligula. Fusce ornare venenatis nisl. ' +
    'Maecenas pellentesque pellentesque arcu, sed eleifend magna eleifend et. Praesent in ultricies metus. Lorem ipsum dolor sit amet, ' +
    'consectetur adipiscing elit. Praesent a dapibus neque. ' +
    'Nulla nec purus pretium, sollicitudin metus id, sodales augue. Aliquam in metus ac diam consectetur maximus in in mi.';

  constructor() { }

  ngOnInit() {
  }

}
