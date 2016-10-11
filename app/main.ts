import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { DashboardModule } from '../modules/dashboard/dashboard';

platformBrowserDynamic().bootstrapModule(AppModule);
