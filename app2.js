// https://data.gov.tw/dataset/139391
// https://od.moi.gov.tw/api/v1/rest/datastore/301000000A-001736-001
// https://data.gov.tw/dataset/23889
// https://od.moi.gov.tw/api/v1/rest/datastore/301110000A-000276-008
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

// proxy middleware options
const options = {
  target: "https://od.moi.gov.tw", // target host
  changeOrigin: true, // needed for virtual hosted sites
  //   ws: true, // proxy websockets
  pathRewrite: {
    "^/api/v1": "/api/v2", // rewrite api v1 to v2
    "^/api/v2": "/api/v1", // rewrite api v2 to v1
    "^/api/rest": "/api/v1/rest", // add base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "dev.localhost:3000": "https://dev.od.moi.gov.tw",
    "staging.localhost:3000": "https://staging.od.moi.gov.tw",
  },
};

const exampleProxy = createProxyMiddleware("/api", options);

const app = express();
const port = 3001;

app.use("/", exampleProxy);
// app.use("/api", exampleProxy);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
