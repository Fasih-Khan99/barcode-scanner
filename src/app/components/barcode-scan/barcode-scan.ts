
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/browser';

@Component({
  selector: 'app-barcode-scan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barcode-scan.html',
  styleUrls: ['./barcode-scan.css'],
})
export class BarcodeScanComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: false })
  videoElement!: ElementRef<HTMLVideoElement>;

  reader = new BrowserMultiFormatReader();
  devices: MediaDeviceInfo[] = [];
  selectedDeviceId: string = '';
  scannedCodes: string[] = [];

  async ngOnInit() {
    try {
      this.devices = await BrowserMultiFormatReader.listVideoInputDevices();
      if (this.devices.length > 0) {
        this.selectedDeviceId = this.devices[0].deviceId;
        this.startScan();
      }
    } catch (err) {
      console.error('Error listing video devices', err);
    }
  }

  scanNow() {
    this.startCamera();
    this.startScan();
  }

  startCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        const video = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error('Camera Error:', error);
        alert('Camera access is blocked. Please allow camera permissions!');
      });
  }

  startScan() {
    if (!this.selectedDeviceId) return;
    this.reader
      .decodeFromVideoDevice(
        this.selectedDeviceId,
        this.videoElement.nativeElement,
        (result, err) => {
          if (result) {
            const code = result.getText();
            if (!this.scannedCodes.includes(code)) {
              this.scannedCodes.push(code);
            }
          }
          if (err) {
            // console.warn(err);
          }
        }
      )
      .catch((err) => {
        console.error('Error starting decodeFromVideoDevice', err);
      });
  }

  onDeviceChange(deviceId: string) {
    this.stopScan();
    this.selectedDeviceId = deviceId;
    this.startScan();
  }

  stopScan() {
    (this.reader as any).reset();

    const video = this.videoElement?.nativeElement;
    if (video && video.srcObject) {
      (video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    }
  }

  ngOnDestroy() {
    this.stopScan();
  }
}
