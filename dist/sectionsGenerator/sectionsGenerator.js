"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function base64_encode(file) {
    console.log(fs_1.default.readFileSync(file, 'base64'));
    return fs_1.default.readFileSync(file, 'base64');
}
function image() {
    return { image: base64_encode('../fonts/TitkaBella.png'), width: 80, height: 80 };
}
exports.image = image;
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
        ]
    };
    return header;
}
exports.generateHeader = generateHeader;
function generateMetadata(invoice) {
    const metaData = {
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
exports.generateMetadata = generateMetadata;
function tableColumn(label) {
    return {
        text: label,
    };
}
function displayInfo(label, value) {
    const info = {
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
function generateSenderInformation(invoice) {
    const senderInfo = invoice.senderInformation;
    const senderInformation = [
        displayInfo("Постачальник", senderInfo.fullName),
        displayInfo("Телефон", senderInfo.phone),
        displayInfo("Адреса", senderInfo.address),
        displayInfo("ІПН", senderInfo.taxPayerId),
    ];
    return senderInformation;
}
exports.generateSenderInformation = generateSenderInformation;
function generateCustomerInformation(invoice) {
    const customerInfo = invoice.customerInformation;
    const customerInformation = {
        text: [
            displayInfo("Клієнт", customerInfo.fullName),
            displayInfo("Адреса", customerInfo.address),
        ],
    };
    return customerInformation;
}
exports.generateCustomerInformation = generateCustomerInformation;
function generateServiceInformation(invoice) {
    return displayInfo("Послуга", invoice.serviceType);
}
exports.generateServiceInformation = generateServiceInformation;
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
        tableColumn("Date"),
        tableColumn("Time"),
        tableColumn("Type of work"),
        tableColumn("Rate"),
        tableColumn("Total"),
    ]);
    paymentInformation.forEach((pay) => body.push([...Object.values(pay)]));
    return body;
}
function generateTable(invoice) {
    return {
        table: {
            widths: ["auto", "*", "*", "*", "auto"],
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