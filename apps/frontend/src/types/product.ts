interface ProductCommon {
  type: "subs" | "sub" | "inapp" | "iap";
  productId: string; //iOS
  productIds?: string[];
  title: string;
  description: string;
  price: string;
  currency: string;
  localizedPrice: string;
  countryCode?: string;
}

export interface Product extends ProductCommon {
  type: "inapp" | "iap";
  oneTimePurchaseOfferDetails?: {
    priceCurrencyCode: string;
    formattedPrice: string;
    priceAmountMicros: string;
  };
}

export enum PurchaseStateAndroid {
  UNSPECIFIED_STATE = 0,
  PURCHASED = 1,
  PENDING = 2,
}

export interface ProductPurchase {
  productId: string;
  transactionId?: string;
  transactionDate: number;
  transactionReceipt: string;
  purchaseToken?: string;
  //iOS
  quantityIOS?: number;
  originalTransactionDateIOS?: number;
  originalTransactionIdentifierIOS?: string;
  verificationResultIOS?: string;
  appAccountToken?: string;
  //Android
  productIds?: string[];
  dataAndroid?: string;
  signatureAndroid?: string;
  autoRenewingAndroid?: boolean;
  purchaseStateAndroid?: PurchaseStateAndroid;
  isAcknowledgedAndroid?: boolean;
  packageNameAndroid?: string;
  developerPayloadAndroid?: string;
  obfuscatedAccountIdAndroid?: string;
  obfuscatedProfileIdAndroid?: string;
  //Amazon
  userIdAmazon?: string;
  userMarketplaceAmazon?: string;
  userJsonAmazon?: string;
  isCanceledAmazon?: boolean;
}
