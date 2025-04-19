const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

const user = [
    { email: "alice@example.com", password: "alice123" },
    { email: "bob@example.com", password: "bob123" },
    { email: "charlie@example.com", password: "charlie123" },
]

app.put('/update', (req, res) => {
    try{
        const { email, password } = req.body;
        const userIndex = user.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            user[userIndex].password = password;
            res.status(200).json({ message: "Password updated successfully" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.delete('/delete', (req, res) => {   
    try{
        const { email } = req.body;
        const userIndex = user.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            user.splice(userIndex, 1);
            res.status(200).json({ message: "User deleted successfully" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}   )