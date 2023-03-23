import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import * as React from 'react';
import { useNavigate } from 'react-router';
import useReq from '../../app/request';

/**
 *  참고 URL :
 *  https://stackblitz.com/edit/react-rfpsqp?file=demo.js
 */
const headCells = [
  {
    id: 'seq',
    align: 'center',
    disablePadding: true,
    label: '순번',
  },
  {
    id: 'name' + 'seq',
    align: 'center',
    disablePadding: false,
    label: '고객명',
  },
  {
    id: 'loanSeqNo',
    align: 'center',
    disablePadding: false,
    label: '대출번호',
  },
  {
    id: 'contStat',
    align: 'center',
    disablePadding: false,
    label: '계약상태',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "전체선택",
            }}
          />
        </TableCell>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.id + idx}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableSample() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [allItemCount, setAllItemCount] = React.useState(0);
  const [category, setCategory] = React.useState("00");
  const [searchText, setSearchText] = React.useState("");
  const req = useReq();
  const nav = useNavigate();

  const getData = () => {
    req.post({
      url: '/api/user/getSampleTableData',
      params: {
        page : page,
        order : order,
        orderBy : orderBy,
        rowsPerPage : rowsPerPage,
        category: category,
        searchText: searchText
      },
      success: function(data) {
        setRows(data.list);
        setAllItemCount(data.allItemCount);
        console.log(rows);
      }
    });
  }

  React.useEffect(()=> {
    getData();
  },[page, order, orderBy, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.seq);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, seq) => {
    const selectedIndex = selected.indexOf(seq);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, seq);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (seq) => selected.indexOf(seq) !== -1;

  const alertSelected = () => {
    alert(selected);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
            >
              <MenuItem value="00">
                <em>전체</em>
              </MenuItem>
              <MenuItem value={"01"}>순번</MenuItem>
              <MenuItem value={"02"}>고객명</MenuItem>
              <MenuItem value={"03"}>대출번호</MenuItem>
            </Select>
          </FormControl>
          <TextField sx={{ m: 1, minWidth: "30%" }} 
            id="standard-basic" 
            label="검색어" 
            variant="standard" 
            value={searchText}
            onChange={(e)=>{setSearchText(e.target.value)}}
          />
          <Button sx={{ m: 2}} variant="contained" onClick={()=>{getData()}}>검색</Button>
          <Typography sx={{ m: 2, color:"red"}}>
            ※ 실제 검색이 되진 않습니다. 데이터 전달부만 확인해주세요.
          </Typography>
        </Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .map((row, index) => {
                  const isItemSelected = isSelected(row.seq);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.seq)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.seq}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.loanSeqNo}</TableCell>
                      <TableCell align="center">{row.contStat}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allItemCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box dir="rtl">
        <Button variant="contained" onClick={()=>{alertSelected()}}>선택값 alert</Button>
      </Box>
      <Button variant="contained" color="secondary" onClick={()=>{nav("/sample")}}>Sample 홈으로..</Button>
    </Box>
  );
}