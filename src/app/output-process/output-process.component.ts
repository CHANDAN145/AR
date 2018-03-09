import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/common.service';
import {Discrepancy} from 'app/app.model';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-output-process',
  templateUrl: './output-process.component.html',
  styleUrls: ['./output-process.component.css']
})

export class OutputProcessComponent implements OnInit {
  outputFilePath: string;
  checkAll:boolean = false;
  items: Employee[];
  discripancy: Discrepancy;
  searchText: string;
  public reportLoading = true;
  constructor(private service: CommonService) { }
  discrepancies: Discrepancy[];
  link: string;
  displayLink: Boolean;
  isSearchBarVisible: Boolean;

  ngOnInit() {
    this.discrepancies = new Array<Discrepancy>();
    this.searchText = "";
    console.log(this.discrepancies);
    this.reportLoading = true;
    this.isSearchBarVisible = false;
    this.service.discrepancyList.subscribe(x => this.onListRecieve(x));
  }

  onListRecieve(discrepancyList)
  {
    this.discrepancies = discrepancyList;
    console.log(discrepancyList);
    this.reportLoading = false;
    this.service.getLatestFilePath().subscribe(x => this.onFilePathRecieved(x)) ;
    if(this.discrepancies.length > 0)
    this.isSearchBarVisible = true;
    //this.service.getdownloadFilePath().subscribe(x => this.onGettingFilePath(x));
  }

  onGettingFilePath(x: string): void {
    this.outputFilePath = x;
  }

  submitAction(p): void {
    console.log(p);
    let selectedEmployees = new Array<Discrepancy>();
    selectedEmployees =  this.discrepancies.filter(x => x.isChecked === true);
   console.log(selectedEmployees);
   this.reportLoading = true;
   this.service.sendMail(selectedEmployees).subscribe(x => this.onMailSent(x),(error)=>this.onMailSent(error));
  }
  
  onMailSent(x): void {
    this.reportLoading = false;
  }

  onFilePathRecieved(x){
    this.link = x;
    this.displayLink = true;
  }
  onCheck(index): void {
    this.discrepancies[index].isChecked = !this.discrepancies[index].isChecked;
  }

  onClickLink() {
    this.service.getFile(this.link).subscribe(response => {
      console.log(response);
      var data = response.text();
      var blob = new Blob([data], {type: 'text/csv'});
      var filename = this.link;
      FileSaver.saveAs(blob, filename);    
    });
  }
  handleChange(val: boolean, index: number){
    console.log("Index: "+index);
    console.log("Val:  "+val);
    this.discrepancies[index].isChecked = !val;
  }
  
  CheckAll()
  {
      this.reportLoading = true;
      this.checkAll = !this.checkAll;
      this.discrepancies.forEach( x=>x.isChecked = this.checkAll);
      this.reportLoading = false;
  }

 
}

export class Employee {
  ntplID: string;
  name: string;
  desc: string;
  isChecked: boolean;
  mail: string;
}
