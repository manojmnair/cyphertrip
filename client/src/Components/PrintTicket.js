import React from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
////////////
//Ticket
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
// Create Document Component
const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{props.beneficiary} are awarded {props.trips} TRIPs</Text>
      </View>
    </Page>
  </Document>
);

////////////
const Ticket = (props) => (
<>

          <h5 className='card-title text-uppercase'>
    <PDFDownloadLink document={<MyDocument trips = {props.trips} beneficiary = {props.beneficiary}/>} fileName="Ticket.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Ticket!')}
    </PDFDownloadLink>
</h5>


</>
);

export default Ticket;




