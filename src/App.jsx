import './App.css';
import { useState } from 'react';
import { FaBomb, FaChessBoard } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";

function App() {
  const [inputs, setInputs] = useState({})
  let bombSize = 7
  const [renderedList, setRenderedList] = useState([])
  const [score, setScore] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  
  const onStartHandler = (e) => {
    e.preventDefault()
    if(!inputs.mines || !inputs.width || !inputs.height){
      return alert('Please Enter your Inputs')
    } else {
      const num = Number(inputs.width) * Number(inputs.height)
      let newList = Array.from({length: num}, () => ({p: '.'}))
      let bomb = inputs.mines
      for(let i=0; i<num; i++){
        if(bomb > 0){
        const randomNum = Math.floor(Math.random()*num)
        if(newList[randomNum]?.p !== 'B'){
          newList[randomNum] = {p: 'B'}
          bomb--
        }
      }
    }
    setRenderedList(newList)
    setIsStarted(true) 
    }
  }

  function fireBomb(){
    alert('OUT')
  }

  const onClickHandler = ({d, ind}) => {
    if(d.p === 'B'){
      return fireBomb()
    } else {
      const newList = [...renderedList]
      newList[ind] = {...newList[ind], act: 'T'}
      setRenderedList(newList)      
      setScore(prev => prev+30)
    }
  }

  return (
    <div>
      {
        !isStarted ? 
        <div className='game-start-ui'>
          <span>Enter Your Inputs</span>
          <form className='form'>
            <input placeholder='Mines' type='number' onChange={e => setInputs({...inputs, ['mines']:e.target.value})} value={inputs.mines} name='mines' min={1}/>
            <input type="number" onChange={e => setInputs({...inputs, ['width']:e.target.value})} value={inputs.width} min={2} placeholder='Width' name="width" id="" />
            <input type="number" onChange={e => setInputs({...inputs, ['height']:e.target.value})} value={inputs.height} min={2} placeholder='Height' name="height" id="" />
            <button onClick={onStartHandler}>Start</button>
          </form>
        </div> :
        <div className='board'>
          <p className='heading'>
            <span><FaBomb />{inputs.mines}</span>
            <span><FaChessBoard />{inputs.width + ' X ' + inputs.height}</span>
            <span><IoMdStats />{score}</span>
          </p>
          <div className='grid-container' style={{gridTemplateColumns: `repeat(${inputs.width}, 1fr)`, }}>
            {
              renderedList?.map((d, ind) => <div className={`grid-item ${d?.act === 'T' ? 'active' : ''}`} key={ind} onClick={() => d?.act === 'T' ? alert('Already Clicked') : onClickHandler({d, ind})}>{d?.p}</div>)
            }
          </div>
        </div>
      }
    </div>
  );
}

export default App;
