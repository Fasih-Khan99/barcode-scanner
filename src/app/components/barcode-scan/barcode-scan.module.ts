// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BarcodeScan } from './barcode-scan';
// import { FormsModule } from '@angular/forms';

// @NgModule({
//   declarations: [BarcodeScan],
//   imports: [CommonModule, FormsModule, BarcodeScan],
//   exports: [BarcodeScan]
// })
// export class BarcodeScannerModule {}




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeScanComponent } from './barcode-scan';

@NgModule({
  imports: [
    CommonModule,
    BarcodeScanComponent 
  ],
  exports: [BarcodeScanComponent]
})
export class BarcodeScannerModule {}
