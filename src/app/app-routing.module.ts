import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './home/main/main.component';
import { ArtworkComponent } from './artwork/artwork.component';
import { DocsComponent } from './docs/docs.component';
import { CollectionComponent } from './collection/collection.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path : "",
    component : MainComponent
  },
  {
    path : "home",
    component : MainComponent
  },
  {
    path : "exhibition",
    component : ArtworkComponent
  },
  {
    path : "favourite",
    component : DocsComponent
  },
  {
    path : "collection",
    component : CollectionComponent
  },
  {
    path : "view/:id",
    component : ViewComponent
  },
  {
    path : "**",
    component : NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
