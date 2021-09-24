import { createInvoice } from "./createInvoice";
import { Invoice } from "./dataModelsTypes/invoice";

const invoice: Invoice = {
  metaData: {
    city: "San Francisco",
    date: new Date().toLocaleDateString(),
  },
  customerInformation: {
    fullName: "ТОВ \"ПІНК ФРОЙД\"",
    USREOU: "43638358",
  },
  paymentInformation: [
    {
      name: 'Послуги надання доступу до сервісу «TakeUsEat» за період 01.09.21-30.09.21',
      amount: 1,
      price: 1125,
    },
    {
      name: 'Послуги надання доступу до сервісу «TakeUsEat» за період 01.09.21-30.09.21',
      amount: 1,
      price: 1125,
    },
  ],
  invoice_nr: 1234,
  total: 10000,
  senderFullName: "Oleksandr Leskiv",
};

createInvoice(invoice, "invoice.pdf");
