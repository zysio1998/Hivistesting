import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  
  connectWallet,  
  getCurrentWalletConnected,
} from "./util/interact.js";



const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  //const data = useSelector((state) => state.data);
  

  //called only once
  useEffect(async () => {
    
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

    addWalletListener(); 
}, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus(" Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus(" Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          {" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  

  //the UI of our component
  return (
    <div id="container">
      
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      
      

     
    </div>
  );
};

export default HelloWorld;
