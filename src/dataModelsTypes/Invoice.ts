export type Invoice = {
    metaData: {
      city: string,
      date: string
    },
    customerInformation: {
      fullName: string,
      USREOU: string
    },
    paymentInformation: PaymentInformation[],
    invoice_nr: number,
    total: number,
    senderFullName: string,
  };

  type PaymentInformation = {
    name: string,
    amount: number,
    price: number,
  }