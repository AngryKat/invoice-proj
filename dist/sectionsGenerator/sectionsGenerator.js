"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const written_number_1 = __importDefault(require("written-number"));
const fs_1 = __importDefault(require("fs"));
function base64_encode(file) {
    return fs_1.default.readFileSync(file, "base64");
}
function convertAmountToWords(amount) {
    let uahFormat = 'гривень';
    const lastDigit = amount % 10;
    if (lastDigit === 1) {
        uahFormat = 'гривня';
    }
    if (lastDigit <= 4 && lastDigit > 1) {
        uahFormat = 'гривні';
    }
    return `${written_number_1.default(amount, { lang: 'uk' })} ${uahFormat} 00 коп`;
}
function generateHeader(invoice) {
    const header = {
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
exports.generateHeader = generateHeader;
function tableColumn(label) {
    return {
        text: label,
        style: { alignment: "center" },
    };
}
function generateSenderInformation(invoice) {
    const senderInformation = {
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
exports.generateSenderInformation = generateSenderInformation;
function generateCustomerInformation(invoice) {
    const { fullName, USREOU } = invoice.customerInformation;
    const customerInformation = {
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
exports.generateCustomerInformation = generateCustomerInformation;
function generateAmountInwords(invoice) {
    const amountInWords = {
        columns: [
            { width: "auto", text: "Сума прописом:", style: { bold: true } },
            {
                width: "auto",
                stack: [
                    {
                        text: convertAmountToWords(1235),
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
exports.generateAmountInwords = generateAmountInwords;
function generatePaymentPeriodWarning() {
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
exports.generatePaymentPeriodWarning = generatePaymentPeriodWarning;
function tableBody(paymentInformation) {
    const body = [];
    body.push([
        tableColumn("№"),
        tableColumn("Назва"),
        tableColumn("К-ть"),
        tableColumn("Ціна без ПДВ"),
        tableColumn("Сума без ПДВ"),
    ]);
    const tableCells = (pay) => [...Object.values(pay)].map((val) => {
        return { text: val, style: { alignment: "center" } };
    });
    paymentInformation.forEach((pay, index) => body.push([
        index + 1,
        ...tableCells(pay),
        { text: pay.amount * pay.price, style: { alignment: "center" } },
    ]));
    return body;
}
function generateTable(invoice) {
    return {
        table: {
            headerRows: 1,
            widths: ["auto", "auto", "*", "*", "*"],
            body: tableBody(invoice.paymentInformation),
        },
    };
}
exports.generateTable = generateTable;
function generateTotal(invoice) {
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
exports.generateTotal = generateTotal;
function generateSenderSign(invoice) {
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
exports.generateSenderSign = generateSenderSign;
//# sourceMappingURL=sectionsGenerator.js.map