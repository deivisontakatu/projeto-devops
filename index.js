const http = require('http');

const app = http.createServer((req, res) => {
  res.end("Hello DevOps 🚀");
});

// 👇 só roda se for executado diretamente
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

module.exports = app;