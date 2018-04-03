import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, HttpModule , FormsModule, ReactiveFormsModule  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
