import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {AgGridModule} from "ag-grid-angular/main";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule,HttpModule,AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
