import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';
import {FileDetail, GenerateData, Discrepancy} from 'app/app.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class CommonService {
  private baseUrl = environment.endpoints.managementApi;
  public discrepancyList = new BehaviorSubject<Discrepancy[]>([]);
  
  constructor(private http: Http) { }

  getUploadedFiles(): Observable<FileDetail> {
    return this.http
    .get( this.baseUrl + 'uploadedfiles', null)
    .map(res =>  this.extractData<FileDetail>(res));
  }

  reconcile(data: GenerateData): Observable<Discrepancy[]> {
    return this.http
    .post( this.baseUrl + 'reconcile', data ,this.getDefaultRequestOptions())
    .map(res =>  this.extractData<Discrepancy[]>(res));
  }

  uploadFiles(formData: FormData): Observable<Response> {
    return this.http 
    .post(this.baseUrl + 'uploadfile', formData, null)
  //  .map(res => this.extractData<Response>(res));
  }

  sendMail(discrepancies: Discrepancy[]): Observable<Response> {
    return this.http
    .post(this.baseUrl + 'sendMail',discrepancies, null)
//    .map(res => this.extractData<Response>(res));
  }

  getdownloadFilePath(): Observable<string> {
    return this.http
    .get(this.baseUrl + 'getUploadLink', null)
    .map(res => this.extractData<string>(res))
  }

  getLinks(): Observable<string[]> {
    return this.http
    .get(this.baseUrl + 'GetHistoricalData', null)
    .map(res => this.extractData<string[]>(res))
  }

  getFile(fileName: string): Observable<Response> {
    return this.http
    .get(this.baseUrl + 'attachement/a?filename=' + fileName ,{ responseType: ResponseContentType.Blob } )
  }

  getLatestFilePath(): Observable<String> {
    return this.http
    .get(this.baseUrl + 'GetLatestFile' )
    .map(res => this.extractData<string>(res));
  }

  extractResponse(res: Response): Response {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res;
  }

  

  

  extractData<T>(res: Response) {
    res = this.extractResponse(res);
    const body = res.json ? res.json() : null;
    return <T>(body || {});
  }

  getDefaultHeaders(): Headers {
    const headers = new Headers({'Content-Type': 'application/json'});
  
    return headers;
  }

  getDefaultRequestOptions(): RequestOptionsArgs {
    let headers;
    headers = this.getDefaultHeaders();
    console.log(headers);
    return { headers };
  }

  setDiscrepancyList(discrepancies: Discrepancy[]) {
    this.discrepancyList.next(discrepancies);
  }

  handleError(error: Response) {
    // we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
