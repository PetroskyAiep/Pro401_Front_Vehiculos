import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule} from '@angular/common/http';
import { GlobalErrorHandlerService } from './core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    PagesModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
