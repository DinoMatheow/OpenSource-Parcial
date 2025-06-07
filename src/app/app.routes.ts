import { Routes } from '@angular/router';
import { PublicLayoutsComponent } from './public/layouts/public-layouts/public-layouts.component';
import Publicroutes from './public/public.routes';

export const routes: Routes = [

  {
    path:'',
   loadChildren: () => import('./public/public.routes').then(m => Publicroutes),
  },

];
