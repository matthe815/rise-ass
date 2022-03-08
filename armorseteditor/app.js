const express = require('express');
const { writeFileSync } = require('fs');
const open = require('open');
const path = require('path');
const { WebSocketServer } = require('ws');

const app = express();
const armorSets = require('../src/api/ArmorList.json');
const skills = require('../src/api/SkillList.json');

const server = new WebSocketServer({
  port: 8081,
});

server.on('connection', (socket) => {
  socket.send(
    JSON.stringify({
      armors: armorSets,
      skills,
    })
  );

  socket.on('message', (data) => {
    const dat = JSON.parse(data);
    let armor;

    switch (dat.op) {
      case 1:
        armor = armorSets.filter((arm) => arm.slot === dat.slot)[dat.id];
        armorSets.splice(armorSets.indexOf(armor), 1);

        writeFileSync(
          path.resolve('../', 'src', 'api', 'ArmorList.json'),
          JSON.stringify(armorSets, null, 4)
        );
        break;

      case 2:
        armor = Object.assign(dat.values, { slot: dat.slot });
        armorSets.push(armor);

        writeFileSync(
          path.resolve('../', 'src', 'api', 'ArmorList.json'),
          JSON.stringify(armorSets, null, 4)
        );
        break;

      default:
        break;
    }

    socket.send(
      JSON.stringify({
        armors: armorSets,
        skills,
      })
    );
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./', 'index.html'));
});

app.listen(8080, () => {
  open('http://localhost:8080');
});
