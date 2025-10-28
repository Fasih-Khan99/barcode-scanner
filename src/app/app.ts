import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarcodeScanComponent } from './components/barcode-scan/barcode-scan';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarcodeScanComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barcode-scanner');
}

