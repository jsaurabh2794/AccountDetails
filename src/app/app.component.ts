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
    if ( this.start > 0){
      this.start = this.start - 10;
      this.end = this.end - 10;
      this.accoontDetailsToShowOnUI = this.accountDetails.slice(this.start , this.end);
    }
  }

  goForward() {
    if(this.start + 10 > this.accountDetails.length){
      this.start = this.start + (this.end - this.start);
      this.end = this.accountDetails.length;
    }else if ( this.end <  this.accountDetails.length){
      this.start = this.start + 10;
      this.end = this.end + 10;
    }
    this.accoontDetailsToShowOnUI = this.accountDetails.slice(this.start , this.end);
  }

}
