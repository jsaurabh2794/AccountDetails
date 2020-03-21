import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountDetail } from './modal/AccountDetails.Modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  API_URL = 'http://starlord.hackerearth.com/bankAccount';
  accountDetails: AccountDetail[] = [];
  accoontDetailsToShowOnUI: AccountDetail[] = [];
  start: number = 0;
  end: number = 10;
  pageSize: number = 10;
  defaultPageNo = true;
 
  constructor(private httpClient: HttpClient) {
   this.httpClient.get<AccountDetail[]>(this.API_URL).subscribe((accountdetails: AccountDetail[]) => {
    for (let temp of accountdetails) {
      this.accountDetails.push(new AccountDetail(
        temp['Account No'],
        temp[ 'Date'],
        temp['Transaction Details'],
        temp['Value Date'],
        temp['Withdrawal AMT'],
        temp['Deposit AMT'],
        temp['Balance AMT']
      ));
    }
    this.accoontDetailsToShowOnUI = this.accountDetails.slice(this.start , this.end);
   });
  }

  goBack() {
    if (this.end % this.pageSize !== 0) {
      this.end = this.end - (this.end % this.pageSize);
      this.start = this.start - this.pageSize;
    } else {
        if (this.start > 0 && this.start - this.pageSize > 0) {
        this.start  = this.start - this.pageSize;
        } else {
        this.start = 0;
        }
        if (this.end > this.pageSize && this.end -this.pageSize > 10) {
        this.end = this.end  - this.pageSize;
        } else {
        this.end = 10;
      }
  }
    this.accoontDetailsToShowOnUI = this.accountDetails.slice(this.start , this.end);
    console.log('Back: ' + this.start + ' ' + this.end);
  }

  goForward() {
    const length = this.accountDetails.length;
    if (this.start + this.pageSize < length && this.end + this.pageSize < length) {
      this.start = this.start + this.pageSize;
      this.end = this.end + this.pageSize;
    } else if (this.end + this.pageSize >= length - 1 && this.end < length - 1) {
      if ( this.start + this.pageSize > length - 1) {
          this.start = this.end + 1;
      } else {
          this.start = this.start + this.pageSize;
      }
      this.end = this.start + length - 1 - this.end;
    }
    this.accoontDetailsToShowOnUI = this.accountDetails.slice(this.start , this.end);
    console.log('Next: ' + this.start + ' ' + this.end);
  }

}
