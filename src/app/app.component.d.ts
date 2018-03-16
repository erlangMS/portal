import { OnInit } from '@angular/core';
import { FileService } from './_file/file.service';
import './rxjs-operators';
export declare class AppComponent implements OnInit {
    private fileService;
    constructor(fileService: FileService);
    ngOnInit(): void;
}
