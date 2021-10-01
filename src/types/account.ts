import { MoneyObject } from "./money";
import { NullableString } from "./shared";

export interface AccountResponse {
  data: AccountResource[];
  links: {
    /** The link to the previous page in the results. If this value is `null` there is no previous page. */
    prev: NullableString;
    /** The link to the next page in the results. If this value is `null` there is no next page. */
    next: NullableString;
  };
}

export interface AccountResource {
  /** The type of this resource: `accounts` */
  type: string;
  /** The unique identifier for this account. */
  id: string;
  attributes: {
    /** The name associated with the account in the Up application. */
    displayName: string;
    /** The bank account type of this account. */
    accountType: AccountTypeEnum;
    /** The available balance of the account, taking into account any amounts that are currently on hold. */
    balance: MoneyObject;
    /** The date-time at which this account was first opened. */
    createdAt: string;
  };
  relationships: {
    transactions: {
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
  };
  links?: {
    /** The canonical link to this resource within the API. */
    self: string;
  };
}

enum AccountTypeEnum {
  SAVER = "SAVER",
  TRANSACTIONAL = "TRANSACTIONAL",
}
