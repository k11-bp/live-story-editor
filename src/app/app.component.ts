import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LiveStoryCanvasComponent} from './live-story-canvas/live-story-canvas.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LiveStoryCanvasComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'live-story-logo-extractor';
}
