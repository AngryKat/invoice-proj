import { Content } from "pdfmake/interfaces";
import { Invoice } from "../dataModelsTypes/Invoice";
import fs from 'fs';

function base64_encode(file) {
  console.log(fs.readFileSync(file, 'base64'))
  return fs.readFileSync(file, 'base64');
}

export function image() {
  return { image:   base64_encode('../fonts/TitkaBella.png'), width: 80, height: 80 };
}
export function generateHeader(invoice: Invoice) {
  const header: Content = {
    columns: [
      {
        text: `Рахунок-фактура №${invoice.invoice_nr}`,
        margin: [0, 25],
        style: {
          alignment: "center",
          fontSize: 16,
        },
      },

    ]
  };
  return header;
}

export function generateMetadata(invoice: Invoice) {
  const metaData: Content = {
    columns: [
      {
        text: [
          {
            text: `Місце і Дата: `,
            style: {
              alignment: "left",
              bold: true,
            },
          },
          {
            text: invoice.metaData.city,
            style: {
              alignment: "left",
            },
          },
        ],
      },
      {
        text: `${invoice.metaData.date}`,
        style: {
          alignment: "right",
        },
      },
    ],
  };
  return metaData;
}

function tableColumn(label): Content {
  return {
    text: label,
  };
}

function displayInfo(label, value) {
  const info: Content = {
    text: [
      {
        text: `${label}: `,
        style: {
          bold: true,
        },
      },
      {
        text: `${value}\n`,
      },
    ],
  };
  return info;
}
export function generateSenderInformation(invoice: Invoice) {
  const senderInfo = invoice.senderInformation;
  const senderInformation: Content = [
    displayInfo("Постачальник", senderInfo.fullName),
    displayInfo("Телефон", senderInfo.phone),
    displayInfo("Адреса", senderInfo.address),
    displayInfo("ІПН", senderInfo.taxPayerId),
  ];
  return senderInformation;
}

export function generateCustomerInformation(invoice: Invoice) {
  const customerInfo = invoice.customerInformation;
  const customerInformation: Content = {
    text: [
      displayInfo("Клієнт", customerInfo.fullName),
      displayInfo("Адреса", customerInfo.address),
    ],
  };
  return customerInformation;
}

export function generateServiceInformation(invoice: Invoice): Content {
  return displayInfo("Послуга", invoice.serviceType);
}

export function generatePaymentPeriodWarning(): Content {
  return [
    {
      text: "Період оплати:",
      style: { bold: true },
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt ornare massa eget egestas purus viverra. Elit ut aliquam purus sit amet luctus venenatis. Morbi non arcu risus quis varius quam quisque id. Augue ut lectus arcu bibendum at varius vel pharetra. Felis eget velit aliquet sagittis id consectetur. Dapibus ultrices in iaculis nunc sed augue lacus.",
      style: { bold: true },
    },
  ];
}

function tableBody(paymentInformation) {
  const body = [];
  body.push([
    tableColumn("Date"),
    tableColumn("Time"),
    tableColumn("Type of work"),
    tableColumn("Rate"),
    tableColumn("Total"),
  ]);
  paymentInformation.forEach((pay) => body.push([...Object.values(pay)]));
  return body;
}
export function generateTable(invoice: Invoice): Content {
  return {
    table: {
      widths: ["auto", "*", "*", "*", "auto"],
      body: tableBody(invoice.paymentInformation),
    },
  };
}

export function generateTotal(invoice: Invoice): Content {
  return {
    columns: [
      {
        text: "Всього до оплати:",
        style: { bold: true },
      },
      {
        text: `${invoice.total}`,
        style: { alignment: "right" },
      },
    ],
  };
}

export function generateSenderSign(invoice: Invoice): Content {
  return {
    columns: [
      {
        text: "Постачальник:",
      },
      { text: "*sign*", style: { alignment: "right" } },
      {
        text: `${invoice.senderFullName}`,
        style: { alignment: "right" },
      },
    ],
  };
}
