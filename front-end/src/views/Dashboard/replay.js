import * as React from 'react';
import { useState, useEffect } from "react"
import { KeyboardDateTimePicker } from "@material-ui/pickers";

export default function DateTimeReplay({opendate,onClose}) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

   const [open,setOpen]=useState(false)
   useEffect(()=>{
     
    setOpen(opendate)

   },[opendate])

   const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
   
     
       <KeyboardDateTimePicker
        open={open}
        onClose={onClose}
        variant="inline"
        ampm={false}
        label="With keyboard"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        format="yyyy/MM/dd HH:mm"
      />
      
    
  );
}