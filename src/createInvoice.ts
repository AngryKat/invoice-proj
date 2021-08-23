import fs from 'fs';
import path from 'path';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Invoice } from './dataModelsTypes/Invoice';
import { image, generateSenderSign, generateTotal, generateHeader, generatePaymentPeriodWarning, generateServiceInformation, generateMetadata, generateSenderInformation, generateTable, generateCustomerInformation } from './sectionsGenerator'
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
		image(),
		generateHeader(invoice),
		'\n\n\n',
		generateMetadata(invoice),
		'\n\n',
		generateSenderInformation(invoice),
		'\n\n',
		generateCustomerInformation(invoice),
		'\n\n',
		generateServiceInformation(invoice),
		generateTable(invoice),
		'\n\n',
		generatePaymentPeriodWarning(),
		'\n\n',
		generateTotal(invoice),
		'\n\n',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas maecenas pharetra convallis. Ultricies tristique nulla aliquet enim tortor at auctor. Aliquam id diam maecenas ultricies mi eget. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Dictum at tempor commodo ullamcorper. Purus ut faucibus pulvinar elementum integer enim neque volutpat. Tellus elementum sagittis vitae et. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Quis blandit turpis cursus in hac habitasse platea. Pellentesque id nibh tortor id aliquet lectus proin nibh. Lobortis mattis aliquam faucibus purus. Accumsan tortor posuere ac ut consequat semper viverra nam. Iaculis urna id volutpat lacus. Sit amet mattis vulputate enim nulla aliquet. At ultrices mi tempus imperdiet nulla. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Ut morbi tincidunt augue interdum.'
		,
		'\n\n',
		generateSenderSign(invoice)

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