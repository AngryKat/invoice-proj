import { Content } from "pdfmake/interfaces";
import { Invoice } from "../dataModelsTypes/Invoice";
import writtenNumber from 'written-number';
import fs from "fs";

function base64_encode(file) {
  return fs.readFileSync(file, "base64");
}

function convertAmountToWords(amount: number) {}

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
    ],
  };
  return header;
}

function tableColumn(label): Content {
  return {
    text: label,
    style: { alignment: "center" },
  };
}

export function generateSenderInformation(invoice: Invoice) {
  const senderInformation: Content = {
    columns: [
      { width: "auto", text: "Постачальник:", style: { bold: true } },
      {
        width: "auto",
        stack: [
          {
            text: "Фізична особа-підприємець ЛЕСЬКІВ ОЛЕКСАНДР АНДРІЙОВИЧ",
            style: { bold: true },
          },
          {
            text: [
              {
                text: "UA36 320649 00000 26000052711276",
                style: { bold: true },
              },
              " в ПАТ КБ «Приватбанк»,",
            ],
          },
          "09100, Київська обл., м. Біла Церква, б-р Олександрійський 125/8",
          "Код ДРФО: 3630502976, ІПН:3630502976 тел.:+380975315564",
          "Платник єдиного податку третьої групи за ставкою 5%",
        ],
      },
    ],
    columnGap: 10,
  };

  return senderInformation;
}

export function generateCustomerInformation(invoice: Invoice) {
  const { fullName, USREOU } = invoice.customerInformation;
  const customerInformation: Content = {
    columns: [
      { width: "auto", text: "Покупець:", style: { bold: true } },
      {
        width: "auto",
        stack: [
          {
            text: fullName,
            style: { bold: true },
          },
          `ЄДРПОУ ${USREOU}`,
        ],
      },
    ],
    columnGap: 35,
  };
  return customerInformation;
}

export function generateAmountInwords(invoice: Invoice) {
  const amountInWords: Content = {
    columns: [
      { width: "auto", text: "Сума прописом:", style: { bold: true } },
      {
        width: "auto",
        stack: [
          {
            text: writtenNumber(1234, {lang: 'uk'}),
            style: { bold: true },
          },
          'в т.ч. ПДВ 0,00 грн',
        ],
      },
    ],
    columnGap: 10,
  };
  return amountInWords;
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
    tableColumn("№"),
    tableColumn("Назва"),
    tableColumn("К-ть"),
    tableColumn("Ціна без ПДВ"),
    tableColumn("Сума без ПДВ"),
  ]);

  const tableCells = (pay) =>
    [...Object.values(pay)].map((val) => {
      return { text: val, style: { alignment: "center" } };
    });

  paymentInformation.forEach((pay, index) =>
    body.push([
      index + 1,
      ...tableCells(pay),
      { text: pay.amount * pay.price, style: { alignment: "center" } },
    ])
  );
  return body;
}
export function generateTable(invoice: Invoice): Content {
  return {
    table: {
      headerRows: 1,
      widths: ["auto", "auto", "*", "*", "*"],
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
