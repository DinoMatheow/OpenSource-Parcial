
import { Routes } from '@angular/router';
import { PublicLayoutsComponent } from './layouts/public-layouts/public-layouts.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RaizComponent } from './pages/raiz/raiz.component';
import { RatingComponent } from './pages/rating/rating.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const Publicroutes: Routes = [


  {
    path: '',
    component:PublicLayoutsComponent,
    children:[
      {
          path:'',
          component:HomePageComponent,
      },
      {
        path: 'raiz',
        component: RaizComponent,
      },
      {
        path: 'engagement/ratings/new',
        component: RatingComponent,
      },
      {
        path:'**',
        component: NotFoundComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo:''
  },


]

export default Publicroutes;