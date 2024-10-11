import { Component, Input } from '@angular/core';
import { AuthenticationProviders } from '../../enums/authentication-providers';
import { UserInfo } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input() type!: AuthenticationProviders | null;
  @Input() user!: UserInfo;
}
