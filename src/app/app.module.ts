import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParametersComponent } from './parameters/parameters.component';
import { AssembleComponent } from './assemble/assemble.component';
import { BannerComponent } from './banner/banner.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    ParametersComponent,
    AssembleComponent,
    BannerComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }