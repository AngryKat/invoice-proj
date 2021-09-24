import fs from 'fs';
import path from 'path';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Invoice } from './dataModelsTypes/Invoice';
import { generateHeader, generateAmountInwords, generateSenderInformation, generateTable, generateCustomerInformation } from './sectionsGenerator'
const fonts = {
    Roboto: {
		normal: path.join(__dirname, '/../src/fonts/Roboto-Regular.ttf'),
		bold: __dirname+'/../src/fonts/Roboto-Medium.ttf',
		italics: __dirname+'/../src/fonts/Roboto-Itals.ttf',
		bolditalics: __dirname+'/../src/fonts/Roboto-MediumItalic.ttf'
	}
  };
export function createInvoice(invoice:Invoice, path:string) {
  const printer = new PdfPrinter(fonts);
  const documentDefinition:TDocumentDefinitions = {
	content: [
		generateHeader(invoice),
		'\n\n\n',
		generateSenderInformation(invoice),
		'\n\n',
		generateCustomerInformation(invoice),
		'\n',
		generateTable(invoice),
		'\n\n',
		generateAmountInwords(invoice)

	]
};
  let doc = printer.createPdfKitDocument(documentDefinition);

//   generateHeader(doc, invoice);
//   generateMetadata(doc, invoice);
//   generateSenderInformation(doc, invoice);
//   generateCustomerInformation(doc, invoice);
//   generateTable(doc, invoice);

  doc.pipe(fs.createWriteStream(path));
  doc.end();

}