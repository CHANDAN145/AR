import { Component, OnInit,ElementRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {FileDetail, GenerateData, Discrepancy} from 'app/app.model';
import { CommonService } from 'app/common.service';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import { ToastsManager } from 'ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { element } from 'protractor';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit {
  private myScrollContainer: ElementRef;
  path: string;
  types: string[];
  files: FileDetail[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  uploadedFiles: FileDetail[];
  discrepancy: Discrepancy[];
  generateData: GenerateData;
  endDate: Date;
  startDate: Date;     
   

  constructor(private service: CommonService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }
  public loading = false;
  public fileLoading = true;
  ngOnInit() {
    this.endDate = new Date();
    this.loading = true;
    this.startDate = new Date();
    this.types = ['Access Control System', 'Employee Data', 'Timing and Billing System', 'Vacation Portal', 'Onsite Employee Data', 'Holidays'];
    this.files = Array<FileDetail>();
    const fileTemp = new FileDetail();
    this.files.push(fileTemp);
    this.dropdownList = [
      {'id': 1 , 'itemName': 'Bangalore'},
      {'id': 2, 'itemName': 'Hyderabad'},
      {'id': 3, 'itemName': 'Kochi'},
      {'id': 4, 'itemName': 'Mumbai'},
      {'id': 5, 'itemName': 'Onsite'},
      {'id': 6, 'itemName': 'Remote'}
    ];

    this.selectedItems = [
      {'id': 1 , 'itemName': 'Bangalore'},
      {'id': 2, 'itemName': 'Hyderabad'},
      {'id': 3, 'itemName': 'Kochi'},
      {'id': 4, 'itemName': 'Mumbai'},
      {'id': 5, 'itemName': 'Onsite'},
      {'id': 6, 'itemName': 'Remote'}
    ];

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Location',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'selector-custom'
    };
    
    const listOfFiles = this.service.getUploadedFiles().subscribe(res => this.onRecieved(res) );
  }

  onRecieved(res) {
    this.uploadedFiles = res;
    console.log("Got Response");
    this.loading = false;
    
    
  }

  fileChange($event, index) {
    console.log("file change called");
    this.loading = true;
    
    const fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.files[index].fileName = file.name;
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      this.service.uploadFiles(formData).subscribe(x =>     this.fileUploaded() );
      // headers.append('Content-Type', 'json');
      // headers.append('Accept', 'application/json');
      this.loading = false;
    }
    this.loading = false;
  }

  fileUploaded(): void {
    this.loading = false;
    this.toastr.success('File uploaded', 'Success!');
    this.files[0].fileName = "";
    this.files[0].fileType = "";
    const listOfFiles = this.service.getUploadedFiles().subscribe(res => this.onRecieved(res) );
  }

  add() {
    this.files.push(new FileDetail());
    console.log('added');
  }

  onSubmitResponse(discrepancyList){
    this.discrepancy = new Array<Discrepancy>();
    this.discrepancy = discrepancyList;    
    console.log(discrepancyList);
    this.service.setDiscrepancyList(this.discrepancy);
    this.loading = false;
  }
  startDateChange($event) {
    this.startDate = $event.currentTarget.value;
    console.log(this.startDate);
  }
  endDateChange($event) {
    this.endDate = $event.currentTarget.value;
    console.log(this.endDate);
  }

  submitAction() {
   this.loading = true;
    
    document.querySelector('#processManager').scrollIntoView();
    
    this.generateData = new GenerateData();
    this.generateData.endDatePick = this.endDate;
    this.generateData.startDatePick = this.startDate;
    this.generateData.locations = new Array<string>();
    this.selectedItems.forEach(selectItem => {
      this.generateData.locations.push(selectItem.itemName);
    });
    this.service.reconcile(this.generateData).subscribe(x => this.onSubmitResponse(x), error => this.onError(error));
  }

  onError(error) {
    this.loading = false;
    this.toastr.error('Reconciliation Error!.');
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
onClickLink(link:string): void {
  this.service.getFile(link).subscribe(response => {
    console.log(response);
    var data = response.text();
    var blob = new Blob();
    var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

     var x : any;
     x=response.blob();
     var filename = link;
   FileSaver.saveAs(x, filename);    
  });
}
}

