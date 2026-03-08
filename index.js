const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const fs = require('fs'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: "*"}));


// file path for the JSON data
const filePath = './json-data/team-members.json';

// Read data from the JSON file when the server starts
function readTeamMembers() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// helper function to save team members to the JSON file
function saveTeamMembers(teamMembers) {
  fs.writeFileSync(filePath, JSON.stringify(teamMembers, null, 2), 'utf-8');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

// Define a GET route for /api/teamMembers
app.get('/api/teamMembers', (req, res) => {    
  try {
    let teamMembers = readTeamMembers(); // Read the latest data from the JSON file
  // Respond with the JSON data
  res.status(200).json({ success: true, count: teamMembers.length, teamMembers: teamMembers });
  } catch (err) {
    console.error('Error reading team members:', err);
    return res.status(500).json({ success: false, error: err });
  }
});

// Define a GET route for just one member
app.get('/api/teamMembers/:id', (req, res) => {
  const memberId = req.params.id;
  let teamMembers = readTeamMembers(); // Read the latest data from the JSON file
  const member = teamMembers.find(m => m.memberID === memberId);
  if (!member) {
    return res.status(404).json({ success: false, error: 'Member not found' });
  }
  res.status(200).json({ success: true, member: member });
});

// Add a POST route to add a new team member
app.post('/api/teamMembers', (req, res) => {
    try {
    const newMember = {
        memberID: req.body.memberID,
        memberName: req.body.memberName,
        yearsOfExperience: req.body.yearsOfExperience,
        skillset: req.body.skillset,
        description: req.body.description,
        projectStartDate: req.body.projectStartDate,
        projectEndDate: req.body.projectEndDate,
        allocationPercentage: req.body.allocationPercentage,
   };
    let teamMembers = readTeamMembers(); // Read the latest data from the JSON file
    teamMembers.push(newMember);
    saveTeamMembers(teamMembers); // Save the updated team members back to the JSON file
    res.status(201).json({ success: true, message: 'New team member added successfully', member: newMember });
} catch (err) {
    console.error('Error adding new team member:', err);
    res.status(500).json({ success: false, error: 'Failed to add new team member' });
}

});

// Assign a task to a team member
app.post('/api/teamMembers/:id/assignTask', (req, res) => {
  const memberId = req.params.id;
  let teamMembers = readTeamMembers(); // Read the latest data from the JSON file

  const member = teamMembers.find(m => m.memberID === memberId);
    if (!member) {
        return res.status(404).json({ success: false, error: 'Member not found' });
    }

    const newTask = {
        taskName: req.body.taskName,
        deliverables: req.body.deliverables,
        taskStartDate: req.body.taskStartDate,
        taskEndDate: req.body.taskEndDate
    };
    member.task = newTask || {}; 
    saveTeamMembers(teamMembers); // Save the updated team members back to the JSON file
    res.status(200).json({ success: true, message: 'Task assigned successfully', member: member });
});

// Update allocation percentage for a team member
app.put('/api/teamMembers/:id/allocation', (req, res) => {
  const memberId = req.params.id;
  let teamMembers = readTeamMembers(); // Read the latest data from the JSON file
  const member = teamMembers.find(m => m.memberID === memberId);
    if (!member) {
        return res.status(404).json({ success: false, error: 'Member not found' });
    }

    console.log('Received allocation update request:', req.body);

    const newAllocation = req.body.allocationPercentage;
    member.allocationPercentage = newAllocation;
    console.log(`Updated allocation percentage for member ${memberId}:`, member );
    saveTeamMembers(teamMembers);
    res.status(200).json({ success: true, message: 'Allocation percentage updated successfully', member: member });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Dummy API running on http://localhost:${PORT}`);
}); 

 