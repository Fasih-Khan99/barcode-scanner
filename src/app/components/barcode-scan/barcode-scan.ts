
// import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { BrowserMultiFormatReader, Result } from '@zxing/browser';

// interface ScannedCode {
//   code: string;
//   format?: string | null;
//   time: string;
//   count: number;
// }

// @Component({
//   selector: 'app-barcode-scanner',
//   templateUrl: './barcode-scan.html',
//   styleUrls: ['./barcode-scan.css']
// })
// export class BarcodeScan implements OnInit, OnDestroy {
//   @ViewChild('videoElem', { static: false }) videoElem!: ElementRef<HTMLVideoElement>;

//   reader = new BrowserMultiFormatReader();
//   devices: MediaDeviceInfo[] = [];
//   selectedDeviceId: string | null = null;
//   scanning = false;
//   continuous = true; 
//   scanned: Map<string, ScannedCode> = new Map();
//   errorMessage = '';
//   supported = true;

//   ngOnInit(): void {
//     // Check if getUserMedia exists
//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       this.supported = false;
//       this.errorMessage = 'Camera API not supported in this browser.';
//       return;
//     }

//     // list available video devices
//     navigator.mediaDevices.enumerateDevices()
//       .then(list => {
//         this.devices = list.filter(d => d.kind == 'videoinput');
//         if (this.devices.length > 0) {
//           // try to pick the environment camera by default
//           const env = this.devices.find(d => /back|rear|environment/i.test(d.label));
//           this.selectedDeviceId = (env && env.deviceId) || this.devices[0].deviceId;
//         }
//       })
//       .catch(err => {
//         this.errorMessage = 'Could not enumerate devices: ' + (err?.message || err);
//       });
//   }

//   async startScanner() {
//     this.errorMessage = '';
//     if (!this.selectedDeviceId) {
//       this.errorMessage = 'No camera found.';
//       return;
//     }

//     try {
//       // decodeFromVideoDevice attaches camera stream to the video element and starts decoding
//       this.scanning = true;
//       const videoEl = this.videoElem.nativeElement;

//       await this.reader.decodeFromVideoDevice(
//         this.selectedDeviceId,
//         videoEl,
//         (result: Result | undefined, err: any) => {
//           if (result) {
//             this.onCodeDetected(result.getText(), result.getBarcodeFormat()?.toString());
//             // if not continuous, stop after first result
//             if (!this.continuous) {
//               this.stopScanner();
//             }
//           }
//           // ignore NotFoundException etc — it's normal while scanning continuously
//           if (err && err.name && err.name !== 'NotFoundException') {
//             // show only unexpected errors
//             console.warn('ZXing error', err);
//           }
//         }
//       );
//     } catch (err: any) {
//       this.errorMessage = 'Failed to start camera: ' + (err?.message || err);
//       this.scanning = false;
//     }
//   }

//   stopScanner() {
//     this.reader.reset();
//     this.scanning = false;
//     // stop any video tracks to free camera
//     const v = this.videoElem?.nativeElement;
//     if (v && v.srcObject) {
//       const stream = v.srcObject as MediaStream;
//       stream.getTracks().forEach(t => t.stop());
//       v.srcObject = null;
//     }
//   }

//   onDeviceChange(deviceId: string) {
//     this.selectedDeviceId = deviceId;
//     if (this.scanning) {
//       this.stopScanner();
//       setTimeout(() => this.startScanner(), 200);
//     }
//   }

//   onCodeDetected(code: string, format?: string | null) {
//     const key = code;
//     const time = new Date().toISOString();
//     if (this.scanned.has(key)) {
//       const item = this.scanned.get(key)!;
//       item.count += 1;
//       item.time = time; // update last scanned time
//       this.scanned.set(key, item);
//     } else {
//       this.scanned.set(key, { code, format: format ?? null, time, count: 1 });
//     }
//   }

//   clearList() {
//     this.scanned.clear();
//   }

//   downloadJson() {
//     const arr = Array.from(this.scanned.values());
//     const blob = new Blob([JSON.stringify(arr, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `scanned-codes-${new Date().toISOString()}.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//   }

//   ngOnDestroy(): void {
//     this.stopScanner();
//   }
// }



// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { BrowserMultiFormatReader } from '@zxing/browser';

// @Component({
//   selector: 'app-barcode-scan',
//   standalone: true,
//   templateUrl: './barcode-scan.html',
//   styleUrls: ['./barcode-scan.css'],
// })
// export class BarcodeScanComponent implements OnInit, OnDestroy {
//   reader = new BrowserMultiFormatReader();
//   devices: MediaDeviceInfo[] = [];
//   selectedDeviceId: string = '';
//   scannedCodes: string[] = [];
//   isScanning = false;

//   async ngOnInit() {
//     const videoInputDevices = await this.reader.listVideoInputDevices();
//     this.devices = videoInputDevices;

//     if (videoInputDevices.length > 0) {
//       this.selectedDeviceId = videoInputDevices[0].deviceId;
//       this.startScan();
//     }
//   }

//   startScan() {
//     this.isScanning = true;
    
//     this.reader.decodeFromVideoDevice(
//       this.selectedDeviceId,
//       'videoElement',
//       (result, _err) => {
//         if (result && !this.scannedCodes.includes(result.getText())) {
//           this.scannedCodes.push(result.getText());
//         }
//       }
//     );
//   }

//   onDeviceChange(deviceId: string) {
//     this.stopScan();
//     this.selectedDeviceId = deviceId;
//     this.startScan();
//   }

//   stopScan() {
//     this.reader.stopContinuousDecode();
//     this.isScanning = false;
//   }

//   ngOnDestroy() {
//     this.stopScan();
//   }
// }





// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { BrowserMultiFormatReader } from '@zxing/browser';

// @Component({
//   selector: 'app-barcode-scan',
//   standalone: true,
//   templateUrl: './barcode-scan.html',
//   styleUrls: ['./barcode-scan.css']
// })
// export class BarcodeScanComponent implements OnInit, OnDestroy {

//   reader = new BrowserMultiFormatReader();
//   devices: MediaDeviceInfo[] = [];
//   selectedDeviceId: string = '';
//   scannedCodes: string[] = [];

//   async ngOnInit() {
//     this.devices = await BrowserMultiFormatReader.listVideoInputDevices();
    
//     if (this.devices.length > 0) {
//       this.selectedDeviceId = this.devices[0].deviceId;
//       this.startScan();
//     }
//   }

//   startScan() {
//     this.reader.decodeFromVideoDevice(
//       this.selectedDeviceId,
//       'videoElement',
//       (result, _err) => {
//         if (result) {
//           const code = result.getText();
//           if (!this.scannedCodes.includes(code)) {
//             this.scannedCodes.push(code);
//           }
//         }
//       }
//     );
//   }

//   onDeviceChange(deviceId: string) {
//     this.stopScan();
//     this.selectedDeviceId = deviceId;
//     this.startScan();
//   }

//   stopScan() {
//     this.reader.reset();
//   }

//   ngOnDestroy() {
//     this.stopScan();
//   }
// }






import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/browser';

@Component({
  selector: 'app-barcode-scan',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './barcode-scan.html',
  styleUrls: ['./barcode-scan.css']
})
export class BarcodeScanComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

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

     this.startCamera();
  }



  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        const video = this.videoElement.nativeElement;
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.error("Camera Error:", error);
        alert("Camera access is blocked. Please allow camera permissions!");
      });
  }



  startScan() {
    if (!this.selectedDeviceId) return;
    this.reader.decodeFromVideoDevice(
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
          // Non-fatal errors while scanning: ignore NotFoundException etc
          // console.warn(err);
        }
      }
    ).catch(err => {
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
      (video.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      video.srcObject = null;
    }
  }

  ngOnDestroy() {
    this.stopScan();
  }
}
