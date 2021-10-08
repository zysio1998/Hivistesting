import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
//import "./styles/reset.css";
//import "./styles/theme.css";
import "./styles/webflow.js";

import "./styles/normalize.css";
import "./styles/webflow.css";
import "./styles/hiviz-world.webflow.css";

//C:\Users\zysio\OneDrive\Documents\NFT\05.10.21 Exhale-Mint()\NFT\example_nft_minter\src\js\webflow.js

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
