import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    CategoriesComponent,
    CategoryComponent,
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ArticlesComponent, ArticleComponent, CategoriesComponent, CategoryComponent, ContextMenuComponent
  ]
})
export class ComponentsModule { }
