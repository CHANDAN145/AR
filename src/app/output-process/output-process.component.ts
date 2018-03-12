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
    var index: number;
    
    for(index = 0; index < this.discrepancies.length - 1; index++ )
    {
      this.discrepancies[index].id = index;
    }

    console.log(discrepancyList);
    this.reportLoading = false;
    this.service.getLatestFilePath().subscribe(x => this.onFilePathRecieved(x)) ;
    if(this.discrepancies.length > 0)
    this.isSearchBarVisible = true;
  }

  onGettingFilePath(x: string): void {
    this.outputFilePath = x;
  }

  submitAction(p): void {
    let selectedEmployees = new Array<Discrepancy>();
    selectedEmployees =  this.discrepancies.filter(x => x.isChecked === true);
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
  onCheck(item:Discrepancy): void {
    let index = this.discrepancies.indexOf(item);
    console.log(index)
    this.discrepancies[index].isChecked = !this.discrepancies[index].isChecked;
    console.log(this.discrepancies[index] )
  }

  onClickLink() {
    this.service.getFile(this.link).subscribe(response => {
      var x : any;
      x=response.blob();
      var filename = this.link;
      FileSaver.saveAs(x, filename);    
    });
  }
  handleChange(val: boolean, index: number){
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
