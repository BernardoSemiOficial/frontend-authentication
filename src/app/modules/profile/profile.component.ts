import { Component, Input } from '@angular/core';
import { UserGithub, UserGoogle } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input() type!: 'github' | 'google';
  @Input() userGithub!: UserGithub;
  @Input() userGoogle!: UserGoogle;
}
