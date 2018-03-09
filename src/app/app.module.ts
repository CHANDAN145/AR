import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ManagerComponent } from './manager/manager.component';
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown';
import { OutputProcessComponent } from './output-process/output-process.component';
import { CommonService } from './common.service';
import { HttpModule } from '@angular/http';
import { LoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DiscripancyFilterPipe } from './output-process/discripancy-pipe';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    OutputProcessComponent,
    DiscripancyFilterPipe
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularMultiSelectModule,
    HttpModule,
    Ng2SearchPipeModule,
    ToastModule.forRoot(),
    LoadingModule.forRoot({fullScreenBackdrop: true})
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
