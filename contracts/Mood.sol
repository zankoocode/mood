// SPDX-License-Identifier: MIT
import "./Context.sol";

pragma solidity ^0.8.17;

    // mood diary contract 
contract Mood is Context {


    string private mood;

    event MoodChange(address indexed changer, string mood);

    // return the current mood
    function getMood () public view returns (string memory) {
        return mood;
    }

    // set the mood
    function setMood (string memory _mood) public {
        mood = _mood;
        emit MoodChange(_msgSender() , _mood);
    }
}