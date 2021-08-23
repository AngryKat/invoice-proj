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
            sectionsGenerator_1.image(),
            sectionsGenerator_1.generateHeader(invoice),
            '\n\n\n',
            sectionsGenerator_1.generateMetadata(invoice),
            '\n\n',
            sectionsGenerator_1.generateSenderInformation(invoice),
            '\n\n',
            sectionsGenerator_1.generateCustomerInformation(invoice),
            '\n\n',
            sectionsGenerator_1.generateServiceInformation(invoice),
            sectionsGenerator_1.generateTable(invoice),
            '\n\n',
            sectionsGenerator_1.generatePaymentPeriodWarning(),
            '\n\n',
            sectionsGenerator_1.generateTotal(invoice),
            '\n\n',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra convallis. Ultricies tristique nulla aliquet enim tortor at auctor. Aliquam id diam maecenas ultricies mi eget. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Dictum at tempor commodo ullamcorper. Purus ut faucibus pulvinar elementum integer enim neque volutpat. Tellus elementum sagittis vitae et. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Quis blandit turpis cursus in hac habitasse platea. Pellentesque id nibh tortor id aliquet lectus proin nibh. Lobortis mattis aliquam faucibus purus. Accumsan tortor posuere ac ut consequat semper viverra nam. Iaculis urna id volutpat lacus. Sit amet mattis vulputate enim nulla aliquet. At ultrices mi tempus imperdiet nulla. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Ut morbi tincidunt augue interdum.',
            '\n\n',
            sectionsGenerator_1.generateSenderSign(invoice)
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