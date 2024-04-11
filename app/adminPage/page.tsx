"use client"
import { useState } from "react";
import "./adminPage.scss"
import anime from 'animejs';

function App() {
    const [isCircle, setIsCircle] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false)

  
    const generate = () => {
        if(show) {
            anime({
                targets: '.block',
                translateX: () => anime.random(-700, 700),
                translateY: () => anime.random(-500, 500),
                scale: () => anime.random(1, 5),
            });
        }
    };
  
    const toggleShape = () => {
      setIsCircle(!isCircle);
    };
  
    return (
      <div className={`animation ${isCircle ? 'circle' : ''}`}>
        <button onClick={() => {
            setShow(true)
            generate()
        }}>Generate</button>
        <button onClick={toggleShape} className="circleBtn">
          {isCircle ? 'Square' : 'Circle'}
        </button>
        {show && [...Array(80)].map((elm, index) => (
          <div key={index} className="block"></div>
        ))}
      </div>
    );
  }
  
export default App;