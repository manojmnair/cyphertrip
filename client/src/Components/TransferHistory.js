import React from "react";
import web3 from "web3";
import { useTable } from "react-table";





export default function TransferHistory(props) {


const { transfers, timeStamps } = props;

console.log(timeStamps);


//const latest = web3.eth.getBlockNumber();
//console.log(latest);


let data = [];

for (const { blockHash:blockHash, blockNumber:blockNumber, returnValues:returnValues } of transfers) {
var element = { "blockHash": blockHash, "blockNumber": blockNumber,"value": returnValues.value};
data.push(element);
};

//const tx = "0xb4942257215ba5715633eb13c15b9e36388c4b7059028bfc66662db62991342c";
//web3.eth.getBlock(tx, (error, block) => {
    //const timeStamp = block.timestamp;
//console.log(new Date(timeStamp*1000));
//});


//const blo = web3.eth.getTransaction({tx}).blockNumber;
//console.log(blo);
//web3.eth.getBlock(7, (error, block) => {
  //  const timestamp = block.timestamp;
//console.log(new Date(timestamp*1000));
    // here you go
//});
//const blo = web3.eth.getTransaction(tx).blockNumber;
//const tim = web3.eth.getBlock(blo).timestamp;
//console.log(tim);


const columns = [
  {
    Header: "Block",
    columns: [
      {
        Header: "Block Hash",
        accessor: "blockHash"
      },
      {
        Header: "Block Number",
        accessor: "blockNumber"
      }
    ]
  },
  {
    Header: "Value",
    columns: [
      {
        Header: "value",
        accessor: "value"
      }
    ]
  }
];

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
////




  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}
