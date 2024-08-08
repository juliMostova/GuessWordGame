import WordList from './WordGame';
import React,{useState,useEffect} from 'react';
import './WordGameStyle.css';

function GameWord (){

const [hint,setHint] = useState('');
const [word,setWord] = useState('');
const [correct,setCorrect] = useState([]);
const [inCorrect,setInCorrect] = useState([]);
const [inpValue,setInpValue] = useState('');
const [maxGuess,setMaxGuess] = useState(8);


const randomText = () =>{

    const randomInd = Math.floor(Math.random() * WordList.length);
  
    const ranObj = WordList[randomInd];
    console.log(ranObj)
    setWord(ranObj.word);
    setHint(ranObj.hint);
    setMaxGuess(8);
    setCorrect([])
    setInCorrect([]);
}

useEffect(()=>{
    randomText();
},[]);

const inputTextChange = (e)=>{
let inpText = e.target.value.toLowerCase();
if(inpText.match(/^[a-z]$/) && !inCorrect.includes(inpText)&& !correct.includes(inpText)){
if(word.includes(inpText)){
    setCorrect([...correct,inpText])
}else{
    setInCorrect([...inCorrect,inpText]);
    setMaxGuess(maxGuess -1);
}
}
setInpValue("");
}

let isOver = maxGuess <= 0;
let isWinner = word.split("").every((ltr)=>correct.includes(ltr));

    return(
        <div className='container'>
        
            <h2 className='title'>Guess the word</h2>
            <div className='content'>
 <input type='text' className='typing-inp'
 maxLength='1' placeholder='type one letter..'
value={(e)=>setInpValue(e.target.value)} onChange={inputTextChange}
 /> 
            <div className='inputs'>
              {
                word.split("").map((letter,ind)=>(
                    <input key={ind} type='text'
                    value={correct.includes(letter)?letter:""} 
                    disabled />
                ))
              }
            </div>
           
            <div className='details'>
            <p className='hint'>Hint :{hint}</p>
            <p className='guesses'>Remaining guesses :<span>{maxGuess}</span></p>
            <p className='wrong-letters'>Wrong letters :<span>{inCorrect.join(",")}</span></p>
            </div>
       
            <button className='resetGame'onClick={randomText} >Reset Game?</button>  
        </div>
        
        {isOver && <p>You Lost,the word was {word.toUpperCase()}</p>}
        { isWinner && <p>Congrats !!You won,the word was{word.toUpperCase()}</p>}
        </div>
    );
}

export default GameWord;