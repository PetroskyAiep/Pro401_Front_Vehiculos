import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogService } from '@app/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { LectorQrModalComponent } from './lectorqrModal.component';

@Component({
  selector: 'app-barcode-scanning',
  templateUrl: './lectorqr.component.html',
  styleUrls: ['./lectorqr.component.scss'],
})
export class LectorqrComponent implements OnInit {
  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl(BarcodeFormat.QrCode),
    lensFacing: new UntypedFormControl(LensFacing.Back),
  });
  
  public barcodes: Barcode[] = [];
  public isSupported = false;
  public isPermissionGranted = false;

  constructor(
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone
  ) {}

  public ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
  }

  public async startScan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || BarcodeFormat.QrCode;
    const lensFacing =
      this.formGroup.get('lensFacing')?.value || LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: LectorQrModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.barcodes = [barcode];
      }
    });
  }

  public async readBarcodeFromImage(): Promise<void> {
    const { files } = await FilePicker.pickImages({ multiple: false });
    const path = files[0]?.path;
    if (!path) {
      return;
    }
    const formats = this.formGroup.get('formats')?.value || BarcodeFormat.QrCode; //this.barcodeFormat.QrCode;
    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats,
    });
    this.barcodes = barcodes;
  }

  public async scan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.scan({
      formats,
    });
    this.barcodes = barcodes;
  }

  public async requestPermissions(): Promise<void> {
    await BarcodeScanner.requestPermissions();
  }

}
