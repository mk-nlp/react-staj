import { useEffect } from "react";
import { NaturalCurve } from "react-svg-curve";

const Curve = () => {

  function DestroyCircles () {
    let circles = document.getElementsByTagName("circle");
    for (let i = 0; i < circles.length; i++) {
      circles[i].remove();
      if ( circles.length > 0 ) DestroyCircles();
    }
  }

  useEffect(() => {
    DestroyCircles();
  }, []);

  return (
    <div style={{position: 'relative'}}>
      <svg width="600" height="250" style={{position: 'absolute', top: 0, left: -300}}>
        <NaturalCurve
          data={[
            [0,0],
            [100, 50],
            [200, 100],
            [300, 150],
            [400, 150],
            [500, 120],
            [600, 100],



          ]}
          stroke="gray"
          fill="transparent"
        >
          
        </NaturalCurve>
      </svg>
      <svg width="600" height="250" style={{position: 'absolute', top: 0, left: -300}}>
        <NaturalCurve
          data={[
            [600, 0],
            [500, 50],
            [400, 100],
            [300, 150],
            [200, 150],
            [100, 120],
            [0, 100],



          ]}
          stroke="gray"
          fill="transparent"
        >
          
        </NaturalCurve>
      </svg>
    
    </div>
  );
};

export default Curve;