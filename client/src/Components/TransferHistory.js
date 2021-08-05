import React from "react";
import { useTable } from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function TransferHistory({ web3, transfers, hashes }) {
 //console.log(timeStamps);
//console.log(hashes);
var times = [];

var key = "bT"
for (var i =0; i < hashes.length; i++){
var obj = {};
web3.eth.getBlock(hashes[i], (error, block) => {
    //times.push(block.timestamp);
times.push(obj[key] = new Date(block.timestamp * 1000).toISOString())

});
};

//var vals = Object.keys(times).map(item => times[item]);
console.log(times);



  let data= [];

  for (const {
    blockNumber,
    returnValues,
  } of transfers) {
    var element = {
      blockNumber: blockNumber,
      value: returnValues.value,
    };
    data.push(element);
  }



  const columns = [
    {
      Header: "Block",
      columns: [

        {
          Header: "Block Number",
          accessor: "blockNumber",
        },
      ],
    },
    {
      Header: "Rewards",
      columns: [
        {
          Header: "TRIPs",

          accessor: "value",
        },
      ],
    },
  ];

  const Table = ({ columns, data }) => {
    const {
      getTableProps,

      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    });

    return (
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    );
  };

  return (

    <div className='card nobord'>
      <div className='card-body'>
        <div className='Table'>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </div>

  );
}
