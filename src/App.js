
import './App.css';
import { useState } from 'react';
import {ethers} from "ethers";

function App() {

  const [mood, setNewMood] = useState();
  const [moodToDisplay, setMoodToDisplay] = useState();
  const [disclaimer, setDisclaimer] = useState();

  const MoodContractAddress = "0x6541ac0d0b31e0ac5538fc774df25535d6c9b2c2";
  const MoodContractABI =  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "changer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "mood",
          "type": "string"
        }
      ],
      "name": "MoodChange",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getMood",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_mood",
          "type": "string"
        }
      ],
      "name": "setMood",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  let MoodContract;
  let signer;

  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  });

  async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    setMoodToDisplay(Mood)
  }

  function handleChange (event) {
    setNewMood(event.target.value)
  }

  async function setMood() {
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
    setDisclaimer('after setting the mood, please wait the transaction to be confirmed and then the mood will update/change and then press the get mood button')
  }

  return (
    <div className="App">
     <header>
      <h1>Mood Toggler Dapp!</h1>
        <h3 className='explaination'>Here we can set or get the mood from <span className='ropsten'>ropsten </span> testnet</h3>

        <h4 className='mood-to-display'>
          Now, The Mood is: <span className='mood'>{moodToDisplay ? moodToDisplay : ''}</span>
        </h4>
        </header>
        

       <main>
          <div className='inputs'>
          <label for="mood">Input Mood:</label> <br />
            <input type="text" className="mood-input" onChange={handleChange}/>
            </div>

            <div className="buttons">
           <button onClick={getMood} className='get-mood-button'>Get Mood</button>
            <button onClick={setMood} className='set-mood-button'>Set Mood</button>
            </div>

        <p className='disclaimer'> 
          {disclaimer ? disclaimer : ''}
        </p>
        </main>
    </div>
  );
}

export default App;
