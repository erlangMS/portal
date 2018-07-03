import { NgModule } from '@angular/core';
import {    MatButtonModule, MatCheckboxModule, MatCardModule, 
            MatInputModule, MatSelectModule,MatSliderModule,
            MatSlideToggleModule,MatDividerModule,MatIconModule,
            MatListModule,MatGridListModule,MatTableModule,
            MatPaginatorModule,MatDialogModule, MatTabsModule, MatSnackBarModule,
            MatProgressSpinnerModule, MatProgressBarModule,
            MatExpansionModule, MatChipsModule} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, MatCheckboxModule, MatCardModule, 
        MatInputModule,MatSelectModule, MatListModule, MatChipsModule,
        MatSliderModule,MatSlideToggleModule,MatDividerModule,MatIconModule,
        MatGridListModule, MatTableModule, MatPaginatorModule,MatDialogModule, MatProgressBarModule,
        MatTabsModule, MatSnackBarModule, MatProgressSpinnerModule,MatExpansionModule
    ],
    exports: [
        MatButtonModule, MatCheckboxModule, MatCardModule, 
        MatInputModule,MatSelectModule, MatListModule, MatChipsModule,
        MatSliderModule,MatSlideToggleModule,MatDividerModule,MatIconModule,
        MatGridListModule, MatTableModule, MatPaginatorModule,MatDialogModule, MatProgressBarModule,
        MatTabsModule, MatSnackBarModule, MatProgressSpinnerModule,MatExpansionModule
    ],
    declarations: [],
    providers: [],
})
export class MaterialComponents {}