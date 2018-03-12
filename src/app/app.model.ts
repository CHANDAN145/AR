  export class FileDetail {
    fileName: string;
    fileType: string;
    fileDate: string;
  }
  
  export class GenerateData {
    startDatePick: Date;
    endDatePick: Date;
    locations: string[];
  }

  export class Discrepancy {
    NTPL_ID: string;
    Name: string;
    TaskName: string;
    Date: string;
    Subject: string;
    Body: string;
    TbsHours: string;
    IsinAccessControl: boolean;
    IsinVacationPortal: boolean;
    IsinTBS: boolean;
    Email: string;
    isChecked = false;
    id: number;
  }