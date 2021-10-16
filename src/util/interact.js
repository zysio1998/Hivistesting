const alchemyKey = "wss://eth-rinkeby.alchemyapi.io/v2/d3g-2QLWS2IB8rUv1HdrvwI8lRARDwcj";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../contracts/NCC.json");
const contractAddress = "0x941C0CB3976cA5E2CEf5E5F46fe92433D35A0bd5";

export const joinAlchemy = new web3.eth.Contract(contractABI, contractAddress);


export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "Oh no:  " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              {" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: " Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: " " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              {" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  