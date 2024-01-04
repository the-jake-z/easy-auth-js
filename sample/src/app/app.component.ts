import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { from } from 'rxjs';
import { getAuthenticatedUser } from '@easy-auth-js/easy-auth'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'easy-auth-js-sample';
  user$ = from(getAuthenticatedUser());
}
