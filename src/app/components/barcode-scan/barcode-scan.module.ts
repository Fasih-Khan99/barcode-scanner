
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
