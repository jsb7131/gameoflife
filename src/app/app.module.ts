import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CellGridComponent } from './cells/cell-grid.component';
import { CellComponent } from './cells/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    CellGridComponent,
    CellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
