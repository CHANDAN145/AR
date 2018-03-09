import { Component, OnInit,ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {FileDetail, GenerateData, Discrepancy} from 'app/app.model';
import { CommonService } from 'app/common.service';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'app';
  links: string[];
  csvFileLinks: string[];
  constructor(private service: CommonService) {}

  ngOnInit() {
    this.service.getLinks().subscribe(x => this.onResponse(x));
  }
  
  onResponse(links)
  {
    this.csvFileLinks = new Array<string>();
    this.links = links;
    this.links.forEach(link => {
     let item = link.split("/");
      link =item[item.length - 1];
      if(link.includes('.csv'))
        this.csvFileLinks.push(link);
    });
    if(this.csvFileLinks.length > 5)
      this.csvFileLinks.splice(5,this.csvFileLinks.length - 5); 
    console.log(this.csvFileLinks);
    
  }

  onLink(index) {
    //this.csvFileLinks[index]
    this.service.getFile(this.csvFileLinks[index]).subscribe(response => {
      console.log(response);
      var data = response.text();
      var filename = this.csvFileLinks[index];
      var blob = new Blob();
      var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if(filename.endsWith("csv"))
        blob = new Blob([data], {type: 'text/csv'});
      else
      debugger 
       blob = new Blob([response.arrayBuffer()], { type: contentType });
       // blob = new Blob([(<any>response)._body], { type: contentType });
      
      FileSaver.saveAs(blob, filename);  
      
    });
    console.log(this.csvFileLinks[index]);
  }
}
