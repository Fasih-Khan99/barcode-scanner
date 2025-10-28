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



// import { Component, ViewChild, AfterViewInit } from '@angular/core';
// import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

// @Component({
//   selector: 'my-app',
//   templateUrl: './app.html',
//   styleUrls: ['./app.css']
// })
// export class AppComponent {
//   name = 'Angular';
//   @ViewChild('scanner', { static: false }) scanner: BarcodeScannerLivestreamComponent;
//   barcode: string;

//   ngAfterViewInit() {
//     this.scanner.start();
//   }

//   onValueChanges(result: any) {
//     this.barcode = result.codeResult.code;
//   }
// }
