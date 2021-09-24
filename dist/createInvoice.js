"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdfmake_1 = __importDefault(require("pdfmake"));
const sectionsGenerator_1 = require("./sectionsGenerator");
const fonts = {
    Roboto: {
        normal: path_1.default.join(__dirname, '/../src/fonts/Roboto-Regular.ttf'),
        bold: __dirname + '/../src/fonts/Roboto-Medium.ttf',
        italics: __dirname + '/../src/fonts/Roboto-Itals.ttf',
        bolditalics: __dirname + '/../src/fonts/Roboto-MediumItalic.ttf'
    }
};
function createInvoice(invoice, path) {
    const printer = new pdfmake_1.default(fonts);
    const documentDefinition = {
        content: [
            sectionsGenerator_1.generateHeader(invoice),
            '\n\n\n',
            sectionsGenerator_1.generateSenderInformation(invoice),
            '\n\n',
            sectionsGenerator_1.generateCustomerInformation(invoice),
            '\n',
            sectionsGenerator_1.generateTable(invoice),
            '\n\n',
            sectionsGenerator_1.generateAmountInwords(invoice)
        ]
    };
    let doc = printer.createPdfKitDocument(documentDefinition);
    //   generateHeader(doc, invoice);
    //   generateMetadata(doc, invoice);
    //   generateSenderInformation(doc, invoice);
    //   generateCustomerInformation(doc, invoice);
    //   generateTable(doc, invoice);
    doc.pipe(fs_1.default.createWriteStream(path));
    doc.end();
}
exports.createInvoice = createInvoice;
//# sourceMappingURL=createInvoice.js.map