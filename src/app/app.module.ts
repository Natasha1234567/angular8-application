import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule} from '@ngrx/store';
import { userReducers} from '../app/store/users.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule} from '@angular/common/http';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    StoreModule.forRoot({ user: userReducers}),
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  exports : [MatSidenavModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
