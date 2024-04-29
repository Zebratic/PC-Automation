const express = require('express');
const { exec } = require('child_process');
const child_process = require("child_process");

const app = express();
const PORT = 1337;

// read body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Shutdown endpoint
app.post('/shutdown', (req, res) => {
    res.send('Shutting down the computer...');
    exec('shutdown now', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
});



// ============================= KVM Commands =============================
// Boot VMs
app.post('/bootvm', (req, res) => {
    var domain = req.body.domain;
    res.send(`Booting ${domain} VM...`);
    exec(`sudo virsh start ${domain}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
    
    // run virt-manager --connect qemu:///system --show-domain-console ${domain} on display 0
    /*
    child_process.spawnSync(
        "bash",
        [
            "-c",
            `virt-manager --connect qemu:///system --show-domain-console ${domain}`,
        ],
        {
          stdio: "inherit",
        }
    );
    */
    
});

// Shutdown VMs
app.post('/shutdownvm', (req, res) => {
    var domain = req.body.domain;
    res.send(`Shutting down ${domain} VM...`);
    exec(`sudo virsh shutdown ${domain}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
