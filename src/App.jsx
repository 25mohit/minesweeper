import './App.css';
import { useState } from 'react';
import { FaBomb, FaChessBoard } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { GiFireBomb } from "react-icons/gi";

function App() {
  const [inputs, setInputs] = useState({})
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
    setRenderedList(renderedList.map(elem => {
      if(elem.p === '.'){
        return {act: 'B'}
      } else {
        return elem
      }
    }))
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
            <span title='Mines'><FaBomb />{inputs.mines}</span>
            <span title='Grid Size'><FaChessBoard />{inputs.width + ' X ' + inputs.height}</span>
            <span title='Score'><IoMdStats />{score}</span>
          </p>
          <div className='grid-container' style={{gridTemplateColumns: `repeat(${inputs.width}, 1fr)`, }}>
            {
              renderedList?.map((d, ind) => <div className={`grid-item ${d?.act === 'T' ? 'active' : ''}`} key={ind} onClick={() => d?.act === 'T' ? alert('Already Clicked') : onClickHandler({d, ind})}>
                {d?.act === 'B' && <GiFireBomb style={{color: 'red', fontSize: '1.2rem'}}/>}
              </div>)
            }
          </div>
        </div>
      }
      <a href="https://www.mohitagarwal.dev" target='_blank'>Gave Design and Developed by Mohit Agarwal</a>
    </div>
  );
}

export default App;
