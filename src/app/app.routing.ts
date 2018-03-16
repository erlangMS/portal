import { Routes ,RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
  {
    "path":  "home",
    "loadChildren" : "./home/home.module#HomeModule",
  },
  {
    "path":  "diplomalist",
    "loadChildren" : "./diploma/diploma.module#DiplomaModule",
  },
  {
    "path":  "lotes",
    "loadChildren" : "./lote/lotes-enviados.module#LotesEnviadosModule",
  },
  {
    "path": "" ,
    "redirectTo": "home",
    "pathMatch": "full"
  }
];
export const routing: ModuleWithProviders  = RouterModule.forRoot(routes);
