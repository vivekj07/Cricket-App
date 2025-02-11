import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useCustomMutation } from "../../../hooks/hooks";
import { useUpdateBatsManStatMutation, useUpdateExtrasMutation } from "../../../redux/api/api";


const EditExtraStats = ({ open, onClose, initialData }) => {
  const [extras, setExtras] = useState(initialData);

  const [updateStats] =useCustomMutation(useUpdateExtrasMutation,"Updating Extra Stats...");
  
    const handleUpdate = async () => {
      await updateStats({ id: extras.scoreId, body :{
          teamId:extras.teamId,byes: extras.byes, legByes: extras.legByes, 
          noBalls: extras.noBalls, wides: extras.wides
       }  
      });
      onClose()
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Extras</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "1rem" }}>
        <TextField label="Byes" type="number" fullWidth value={extras.byes} onChange={(e) => setExtras({...extras,byes:e.target.value})} />
        <TextField label="LegByes" type="number" fullWidth value={extras.legByes} onChange={(e) => setExtras({...extras,legByes:e.target.value})} />
        <TextField label="Wides" type="number" fullWidth value={extras.wides} onChange={(e) => setExtras({...extras,wides:e.target.value})} />
        <TextField label="NoBalls" type="number" fullWidth value={extras.noBalls} onChange={(e) => setExtras({...extras,noBalls:e.target.value})} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExtraStats;
