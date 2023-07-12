import React, {  useEffect, useRef, useState } from 'react'
import Card from './Card';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default React.memo( function CardSlider  ({title,data}) {
   
  const[showControls, setShowControls] = useState(false);
  const[sliderPosition,setSliderPosition] = useState(0);
  const listRef= useRef();
  let handleDirectionRef = useRef();

useEffect(()=>{
  const element = listRef.current;
  
  if(element){
    const distance = element.getBoundingClientRect().x - 50;
     handleDirectionRef.current = (direction) => {
      if (direction === "left" && sliderPosition > 0) {
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
        setSliderPosition(sliderPosition - 1);
      }
      if (direction === "right" && sliderPosition < 4) {
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        setSliderPosition(sliderPosition + 1);
      }
    };
    handleDirectionRef.current();
  }

},[sliderPosition,handleDirectionRef])


  const handleClickLeft = ()=>{
      handleDirectionRef.current("left")
  }
  const handleClickRight = ()=>{
      handleDirectionRef.current("right")
  }
  


  

  return (
    <Container className='flex column'
     onMouseEnter={()=> setShowControls(true)} onMouseLeave={()=> setShowControls(false)}>
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center`}>
         <AiOutlineLeft onClick={handleClickLeft}/>
        </div>
        <div className='flex slider' ref={listRef}>
      {data.map((movie,index)=>{
        return <Card movieData={movie} index={index} key={movie.id}/>
      })}
    </div>
    <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}>
         <AiOutlineRight onClick={handleClickRight}/>
        </div>
      </div>
      
  
    </Container>
  )
})


const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    font-size:1.8rem;
    font-weight:500;
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;

