import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText, Paper } from '@material-ui/core';

function App() {
  const [challenges, setChallenges] = useState([]);
  const [open, setOpen] = useState(false);
  const [challengeData, setChallengeData] = useState({ name: '', firstTerm: '', totalAmount: '', days: '' });
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleInputChange = (e) => {
    setChallengeData({
      ...challengeData,
      [e.target.name]: e.target.value
    });
  };

  const addChallenge = () => {
    const challenge = {
      name: challengeData.name,
      firstTerm: parseFloat(challengeData.firstTerm),
      totalAmount: parseFloat(challengeData.totalAmount),
      days: parseInt(challengeData.days, 10),
      d: (2 * (challengeData.totalAmount / challengeData.days) - 2 * challengeData.firstTerm) / (challengeData.days - 1)
    };

    setChallenges([...challenges, challenge]);
    setOpen(false);
  };

  const showChallenge = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const calculateProgression = (challenge) => {
    const { firstTerm, totalAmount, days } = challenge;
    const d = (2 * (totalAmount / days) - 2 * firstTerm) / (days - 1);
    let amounts = [];
    for (let i = 1; i <= days; i++) {
      amounts.push(firstTerm + (i - 1) * d);
    }
    return amounts;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Challenge
      </Button>
      <List>
        {challenges.map((challenge, index) => (
          <ListItem button key={index} onClick={() => showChallenge(challenge)}>
            <ListItemText primary={challenge.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Challenge</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Challenge Name" name="name" onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="First Term" name="firstTerm" type="number" onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Total Amount" name="totalAmount" type="number" onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Days" name="days" type="number" onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={addChallenge} color="primary">Create</Button>
        </DialogActions>
      </Dialog>

      {selectedChallenge && (
        <Paper style={{ marginTop: '20px', padding: '20px' }}>
          <h2>{selectedChallenge.name}</h2>
          <ul>
            {calculateProgression(selectedChallenge).map((amount, index) => (
              <li key={index}>Day {index + 1}: {amount.toFixed(2)} so'm</li>
            ))}
          </ul>
        </Paper>
      )}
    </div>
  );
}

export default App;
