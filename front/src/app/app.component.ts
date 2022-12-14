import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eventoui';
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
