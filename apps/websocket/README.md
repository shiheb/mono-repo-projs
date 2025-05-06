# socket.io 

## one-to-all demo 

Sever emitting events to all connected clients

### How to run

with SSH key:
```bash
git clone git@github.com:gk3000/socket.io_one_to_all_demo.git
```

with authorization token (password):
```bash
git clone https://github.com/gk3000/socket.io_one_to_all_demo.git
```

then:
```bash
cd socket.io_one_to_all_demo
cd server
npm i
nodemon
```

in another terminal window:
```bash
cd client
npm i
npm start
```

in the browser open http://localhost:3000 to see the client with real-time data updates sent from the server
