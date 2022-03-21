import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SearchTweetsComponent } from './components/search-tweets/search-tweets.component';
import { DisplayTweetsComponent } from './components/display-tweets/display-tweets.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherComponent } from './components/weather/weather.component';
import { TweetsStore } from './components/search-tweets/tweets.store';
import { TemperaturePipe } from './pipes/temperature.pipe';

const routes: Route[] = [
  {
    path: '',
    component: SearchTweetsComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchTweetsComponent,
    DisplayTweetsComponent,
    NavbarComponent,
    WeatherComponent,
    TemperaturePipe
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
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TweetsStore],
  bootstrap: [AppComponent]
})
export class AppModule { }

