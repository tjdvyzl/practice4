import React from 'react'
import { Col } from 'antd';

function GridCards(props) {
  return (
    /*
    화면이 클 땐 card가 4개, 미디움일땐 3개, 작을 땐 1개 
    한 column에 24사이즈인데, 6사이즈 이면 6x4이므로 가장 클 땐 4개가 나오는거임
    */
      
      <Col lg={6} md={8} xs={24}> 
          <div style={{ position: 'relative' }}>
              <a href={`/movie/${props.movieId}`}>
                  <img style={{width:'100%', height:'320px'}}  src={props.image} alt={props.movieName} />
                  
              </a>
          </div>    
    </Col>
  )
}

export default GridCards