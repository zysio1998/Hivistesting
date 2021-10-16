import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { useWallet, UseWalletProvider } from 'use-wallet'

import HelloWorld from './HelloWorld'


export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;



function App() {
  const wallet = useWallet()
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
  const [_mintAmount, setMintAmount] = useState(false);

  const claimNFTs = (_mintAmount) => {
    if (_mintAmount <= 0) {
      return;
    }
  
    setFeedback(`Minting your NFTS...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(_mintAmount)
      .send({
        //gasLimit: "285000", //uncomment if ya want a limit
        to: "0x941C0CB3976cA5E2CEf5E5F46fe92433D35A0bd5",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0.05 * _mintAmount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the NFT is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    
    getData();
    
  }, [blockchain.account]);

  return (
    
    <s.Screen>
      <s.Container>         
        <ResponsiveWrapper /*flex={1} style={{ padding: 24 }}*/>
          <s.TextTitle style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }} > {data.totalSupply}/1000 </s.TextTitle>
          <s.SpacerMedium />
          <s.Container>
            {Number(data.totalSupply) == 1000 ? ( //if 10000 bought already 
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  You can still find Hivis NFTS on{" "}
                  <a
                    target={"_blank"}
                    href={"https://testnets.opensea.io/collection/exhalenfttetsing"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  1 NFT costs 0.05 ETH.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Connect to the ETH network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>


                    <HelloWorld></HelloWorld>



                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 1"}
                    </StyledButton>
                    <StyledButton
                      disabled={claimingNft ? 5 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(5);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 5"}
                    </StyledButton>                    
                    
                  </s.Container>                  
                )}
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>      
      </s.Container>
      <h1>Wallet</h1>
      {wallet.status === 'connected' ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Balance: {wallet.balance}</div>
          <div>Balance: {wallet.chainId}</div>          
          <div>Account: {blockchain.account}</div>
          
          {feedback}
          {data.totalSupply}/1000
          <button onClick={() => wallet.reset()}>disconnect</button>
          <button disabled={claimingNft ? 1 : 0} onClick={(e) => {e.preventDefault();claimNFTs(5);getData();}}>Mint</button>
          
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={(e) => {e.preventDefault(); wallet.connect();dispatch(connect());getData();}}>MetaMask</button>         
          
          
          
        </div>
      )}
    </s.Screen>

    
    
  );
}

// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={4}
    connectors={{
      // This is how connectors get configured means Metamask
      //provided: {provider: window.cleanEthereum}
      portis: { dAppId: 'my-dapp-id-123-xyz' },
    }}
  >
    <App />
  </UseWalletProvider>
)
