import React from "react";
import { PDFDownloadLink, Page, View, Document } from '@react-pdf/renderer';
//import ReactPDF from '@react-pdf/renderer';
//import { PDFViewer } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components'
////////////
//Ticket
// Create styles
//const Body = styled.Page`
  //paddingTop: 35px;
  //paddingBottom: 65px;
  //paddingRight: 35px;
  //paddingLeft: 35px;

//`;
const Header = styled.Text`
  color: grey;
  fontSize: 12px;
  textAlign: center;
  marginBottom: 20px;
  marginTop: 50px;
border:2px solid black;
`;
const Title = styled.Text`
  fontSize: 24px;
  textAlign: center;
`;
const Subtitle = styled.Text`
  margin: 12px;
  fontSize: 18px;
`;

// Create Document Component
const MyDocument = (props) => (
  <Document>
    <Page size="A4">
      <View>
      <Header>
        ~ Cyphertrip ~
      </Header>
      <Title>Journey Ticket</Title>
      <Subtitle>
        Name (address): {props.beneficiary}
      </Subtitle>
      <Subtitle>
        TRIPs awarded: {props.trips}
      </Subtitle>
      <Subtitle>
        Date: {props.departure.substring(0, 4)} : {props.departure.substring(4, 6)} : {props.departure.substring(6, 8)}
      </Subtitle>
      <Subtitle>
        Departure: {props.departure.substring(9, 11)} : {props.departure.substring(11, 13)} : {props.departure.substring(13, 15)}
      </Subtitle>
      <Subtitle>
        Arrival: {props.arrival.substring(9, 11)} : {props.arrival.substring(11, 13)} : {props.arrival.substring(13, 15)}
      </Subtitle>
      <Subtitle>
        Fare: {props.fare} &euro;
      </Subtitle>
      </View>
    </Page>
  </Document>
);

////////////
const Ticket = (props) => (
<>

          <h5 className='card-title text-uppercase'>
    <PDFDownloadLink document={<MyDocument trips = {props.trips} beneficiary = {props.beneficiary} departure = {props.departure} arrival = {props.arrival} fare = {props.fare}/>} fileName="Ticket.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Ticket!')}
    </PDFDownloadLink>
</h5>


</>
);

export default Ticket;




