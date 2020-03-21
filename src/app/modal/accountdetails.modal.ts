export class AccountDetail{
    public accountNo: number;
    public date: string;
    public transactionDetails: string;
    public valueDate: string;
    public withdrawalAmount: string;
    public depositeAmount: string;
    public balanceAmount: string;

    constructor(accountNo:number,
        date:string,
        transactionDetails: string,
        valueDate: string,
        withdrawalAmount: string,
        depositeAmount: string,
        balanceAmount: string){
    
            this.accountNo = accountNo;
            this.date = date;
            this.transactionDetails = transactionDetails;
            this.valueDate = valueDate;
            this.withdrawalAmount = withdrawalAmount;
            this.depositeAmount = depositeAmount;
            this.balanceAmount = balanceAmount;
    }

}