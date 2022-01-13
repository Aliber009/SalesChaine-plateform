import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

//columns and rows
const columns = [
  { field: "id", headerName: "ID", width: 90, headerAlign:"left",align: "left" },
  {
    field: "firstName",
    headerName: "Device",
    headerAlign:"left",
    align: "left",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Type",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Client Owner",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Connecté",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,fullName:"Connecté" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,fullName:"Connecté"},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,fullName:"Connecté" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,fullName:"Connecté"},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,fullName:"Connecté" },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 ,fullName:"Connecté"},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,fullName:"Connecté" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 ,fullName:"Connecté"},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,fullName:"Connecté" },
];


const useStyles = makeStyles(styles);

export default function Notifications() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Notifications</h4>
            <p className={classes.cardCategoryWhite}>
              History of notifications stored here 
            </p>
          </CardHeader>
          <CardBody style={{height:'800px'}}>
            
              
          <DataGrid
           components={{
            Toolbar: GridToolbar}}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection />
            
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
