"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createInvoice_1 = require("./createInvoice");
const invoice = {
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
createInvoice_1.createInvoice(invoice, "invoice.pdf");
//# sourceMappingURL=index.js.map