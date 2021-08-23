import { createInvoice } from "./createInvoice";
import { Invoice } from "./dataModelsTypes/invoice";

const invoice: Invoice = {
  metaData: {
    city: "San Francisco",
    date: new Date().toLocaleDateString(),
  },
  senderInformation: {
    fullName: "FOP Leskiv Oleksandr",
    phone: "0000000",
    address: "address",
    taxPayerId: "id",
  },
  customerInformation: {
    fullName: "Titka Bella",
    address: "Another address",
  },
  paymentInformation: [
    {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      workType: "type",
      rate: 10000,
      total: 10000,
    },
    {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      workType: "type",
      rate: 11000,
      total: 11000,
    },
  ],
  invoice_nr: 1234,
  serviceType: "Some service",
  total: 10000,
  senderFullName: "Oleksandr Leskiv",
};

createInvoice(invoice, "invoice.pdf");
