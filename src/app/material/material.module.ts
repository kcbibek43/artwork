import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
const MaterialComponents = [
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSnackBarModule
];

@NgModule({
  imports: [MaterialComponents ],
  exports: [ MaterialComponents]
})
export class MaterialModule { }
