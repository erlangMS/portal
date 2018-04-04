import { Http } from '@angular/http';
import { RedirectService, DefaultHeaders } from 'seguranca';
import 'rxjs/add/operator/map';
export declare class FileService extends DefaultHeaders {
    private http;
    private redirectService;
    constructor(http: Http, redirectService: RedirectService);
    startRedirect(): boolean;
    onlyRedirectService(): void;
}
