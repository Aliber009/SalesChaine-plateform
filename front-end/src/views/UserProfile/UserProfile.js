import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useEffect } from "react";


import avatar from "assets/img/profile.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [user,setUser]=useState({})
  useEffect(()=>{ 
    setUser(JSON.parse(localStorage.getItem("user")));
  },[])
  //console.log(user.name)
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Personal Profile</h4>
              <p className={classes.cardCategoryWhite}> information of user account</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company "
                    id="company"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={user.company || ""}
                    onChange={(e)=>setUser({...user,company:e.target.value})}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={user.name || ""}
                    onChange={(e)=>setUser({...user,name:e.target.value})}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={user.email || ""}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Role"
                    id="role"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={user.role || ""}
                    onChange={(e)=>setUser({...user,role:e.target.value})}
                  />
                </GridItem>
                
              </GridContainer>
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Engineer / Dev</h6>
              <h4 className={classes.cardTitle}>{user.name}</h4>
              <p className={classes.description}>
                Engineer at Nextronic Dev , I am still a junior but always trying to learn as much as I can.
                Work might run through some bugs eventually so bear with it please :p 
              </p>
              <Button color="primary" round>
                OK
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
