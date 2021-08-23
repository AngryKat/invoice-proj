export type Invoice = {
    metaData: {
      city: string,
      date: string
    },
    senderInformation: {
      fullName: string,
      phone: string,
      address: string,
      taxPayerId: string
    },
    customerInformation: {
      fullName: string,
      address: string
    },
    paymentInformation: PaymentInformation[],
    invoice_nr: number,
    serviceType: string,
    total: number,
    senderFullName: string,
  };

  type PaymentInformation = {
    date: string,
    time: string,
    workType: string,
    rate: number,
    total: number
  }