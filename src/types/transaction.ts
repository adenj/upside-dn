import { MoneyObject } from "./money";
import { NullableString } from "./shared";

enum TransactionStatusEnum {
  HELD = "HELD",
  SETTLED = "SETTLED",
}

interface HoldInfoObject {
  amount: MoneyObject;
  foreignAmount: MoneyObject | null;
}

export interface RoundUpObject {
  amount: MoneyObject;
  boostPortion: MoneyObject | null;
}

interface CashbackObject {
  description: string;
  amount: MoneyObject;
}

export interface TransactionResource {
  /** The type of this resource: transactions */
  type: string;
  /** The unique identifier for this transaction. */
  id: string;
  attributes: {
    /** The current processing status of this transaction, according to whether or not this transaction has settled or is still held. */
    status: TransactionStatusEnum;
    /** The original, unprocessed text of the transaction. This is often not a perfect indicator of the actual merchant, but it is useful for reconciliation purposes in some cases. */
    rawText: NullableString;
    /** A short description for this transaction. Usually the merchant name for purchases. */
    description: string;
    /** Attached message for this transaction, such as a payment message, or a transfer note. */
    message: NullableString;
    /** If this transaction is currently in the `HELD` status, or was ever in the `HELD` status, the amount and foreignAmount of the transaction while `HELD`. */
    holdInfo: HoldInfoObject | null;
    /** Details of how this transaction was rounded-up. If no Round Up was applied this field will be `null`. */
    roundUp: RoundUpObject;
    /** If all or part of this transaction was instantly reimbursed in the form of cashback, details of the reimbursement. */
    cashback: CashbackObject;
    /** The amount of this transaction in Australian dollars. For transactions that were once `HELD` but are now `SETTLED`, refer to the `holdInfo` field for the original amount the transaction was `HELD` at. */
    amount: MoneyObject;
    /** The foreign currency amount of this transaction. This field will be `null` for domestic transactions. The amount was converted to the AUD amount reflected in the `amount` of this transaction. Refer to the `holdInfo` field for the original `foreignAmount` the transaction was `HELD` at. */
    forgeignAmount: MoneyObject | null;
    /** The date-time at which this transaction settled. This field will be `null` for transactions that are currently in the `HELD` status. */
    settledAt: NullableString;
    /** The date-time at which this transaction was first encountered. */
    createdAt: string;
  };
  relationships: {
    account: {
      data: {
        /** The type of this resource: `accounts` */
        type: string;
        /** The unique identifier of the resource within its type. */
        id: string;
      };
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
    /** If this transaction is a transfer between accounts, this field will contain the account the transaction went to/came from. The amount field can be used to determine the direction of the transfer. */
    transferAccount: {
      data: {
        /** The type of this resource: `accounts` */
        type: string;
        /** The unique identifier of the resource within its type. */
        id: string;
      } | null;
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
    category: {
      data: {
        /** The type of this resource: `categories` */
        type: string;
        /** The unique identifier of the resource within its type. */
        id: string;
      } | null;
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
    parentCategory: {
      data: {
        /** The type of this resource: `categories` */
        type: string;
        /** The unique identifier of the resource within its type. */
        id: string;
      } | null;
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
    tags: {
      data: {
        /** The type of this resource: `tags` */
        type: string;
        /** The label of the tag, which also acts as the tag’s unique identifier. */
        id: string;
      }[];
      links?: {
        /** The link to retrieve or modify linkage between this resources and the related resource(s) in this relationship. */
        self: string;
      };
    };
    links?: {
      /** The canonical link to this resource within the API. */
      self: string;
    };
  };
}

export interface TransactionResponse {
  /** The list of transactions returned in this response. */
  data: TransactionResource[];
  links: {
    /** The link to the previous page in the results. If this value is null there is no previous page. */
    prev: NullableString;
    /** The link to the next page in the results. If this value is null there is no next page. */
    next: NullableString;
  };
}
