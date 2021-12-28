export interface ExpenseObject {
  id: number;
  created_at: Date;
  user_id: string;
  total_amount: number;
  vendor: string;
  type: string;
  description: string;
  fully_claimable: boolean;
  claimable_amount: number;
  claimable_percent: number;
  transaction_id: string;
  transaction_date: Date;
}
