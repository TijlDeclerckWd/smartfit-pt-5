import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'trainer-profile-main',
  templateUrl: './trainer-profile-main.component.html',
  styleUrls: ['./trainer-profile-main.component.scss']
})
export class TrainerProfileMainComponent implements OnInit {

  @Input('schedule') schedule;
  @Input('description') description;

  constructor() { }

  ngOnInit() {
    this.description = 'Hello, My name is Joske. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
      '      Curabitur sit amet eros tincidunt, scelerisque felis ac, tempor turpis. In eget venenatis dui.\n' +
      '      Ut pretium malesuada magna nec porttitor. Suspendisse eu eros ac sem maximus vehicula.\n' +
      '      In vitae nisl egestas, tempus sem in, volutpat leo. Curabitur vel augue massa.\n' +
      '      Aliquam sollicitudin sapien in ex viverra, nec molestie magna vulputate. Ut tristique tempor nunc, non pretium nisi lobortis ut.\n' +
      '      Suspendisse elementum congue sem, dictum pellentesque nunc dictum viverra.\n' +
      '      Praesent vitae leo consequat, semper enim vel, feugiat leo. Duis lacinia semper commodo.\n' +
      '      Proin diam metus, rutrum porttitor commodo quis, varius at orci. Vivamus at dignissim diam.\n' +
      '      Sed vel massa orci. Vivamus tincidunt ac neque at dignissim. Etiam ornare nulla non tellus consequat,\n' +
      '      quis vehicula libero fermentum.';
  }

}
