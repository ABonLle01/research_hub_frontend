import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent,
    CategoriesComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ArticlesComponent, ArticleComponent, CategoriesComponent, CategoryComponent
  ]
})
export class ComponentsModule { }
