export class Transaction {
  constructor(
    public name: string,
    public description: string,
    public amount: number,
    public date: Date,
    public type: string,
    public category: string,
    public transactionId?: number
  ) {}
}
