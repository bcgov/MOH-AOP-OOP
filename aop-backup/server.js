
const express = require('express');

const app = new express();
const PORT = 8080;

app.use(express.static('./dist'));

app.get('/', (_, res) => {
	res.render('./dist/index.html');
});

app.get('/*', (_, res) => {
	res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
