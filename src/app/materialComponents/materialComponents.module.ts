import { NgModule } from '@angular/core';
import {    MatButtonModule, MatCheckboxModule, MatCardModule, 
            MatInputModule, MatSelectModule,MatSliderModule,
            MatSlideToggleModule,MatDividerModule,MatIconModule,
            MatListModule,MatGridListModule,MatTableModule,
            MatPaginatorModule,MatDialogModule, MatTabsModule, MatSnackBarModule,
            MatProgressSpinnerModule, 
            MatExpansionModule} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, MatCheckboxModule, MatCardModule, 
        MatInputModule,MatSelectModule, MatListModule,
        MatSliderModule,MatSlideToggleModule,MatDividerModule,MatIconModule,
        MatGridListModule, MatTableModule, MatPaginatorModule,MatDialogModule, 
        MatTabsModule, MatSnackBarModule, MatProgressSpinnerModule,MatExpansionModule
    ],
    exports: [
        MatButtonModule, MatCheckboxModule, MatCardModule, 
        MatInputModule,MatSelectModule, MatListModule,
        MatSliderModule,MatSlideToggleModule,MatDividerModule,MatIconModule,
        MatGridListModule, MatTableModule, MatPaginatorModule,MatDialogModule, 
        MatTabsModule, MatSnackBarModule, MatProgressSpinnerModule,MatExpansionModule
    ],
    declarations: [],
    providers: [],
})
export class MaterialComponents {}