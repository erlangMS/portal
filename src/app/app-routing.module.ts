import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
  {
    "path":  "home",
    "loadChildren" : "./home/home.module#HomeModule"
  },
  {
    "path":  "servicoslist",
    "loadChildren" : "./servico/servicos.module#ServicosModule",
  },
  {
    "path": "" ,
    "redirectTo": "home",
    "pathMatch": "full"
  }
];
export const routing: ModuleWithProviders  = RouterModule.forRoot(routes);
