import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SearchTweetsComponent } from './components/search-tweets/search-tweets.component';
import { DisplayTweetsComponent } from './components/display-tweets/display-tweets.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TweetsStore } from './components/search-tweets/tweets.store';

@NgModule({
  declarations: [
    AppComponent,
    SearchTweetsComponent,
    DisplayTweetsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [TweetsStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
