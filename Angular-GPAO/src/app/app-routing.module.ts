import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { IlotProductionComponent } from './ilot-production/ilot-production.component';


const routes: Routes = [
  { path: 'ordre-fabrication', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'ilot-production', component: IlotProductionComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}