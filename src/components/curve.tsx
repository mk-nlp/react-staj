import { useEffect } from "react";
import { NaturalCurve } from "react-svg-curve";
import { useState } from "react";

const CurveLine = () => {
  // This function is used to remove the circles that are created by the NaturalCurve component
  // This is necessary because the NaturalCurve component creates circles for each point in the data array
  // We don't need them, so send them to the shadow realm. OFF TO THE SHADOW REALM WITH YOU!
  // Also it is part of the library, and I didn't want to modify the library code.
  function DestroyCircles () {
    let circles = document.getElementsByTagName("circle");
    for (let i = 0; i < circles.length; i++) {
      circles[i].remove();
    }
    // Recursion here to make sure all circles are removed
      //and not missed by timing issues at mount as this function is called in useEffect
    if ( circles.length > 0 ) DestroyCircles();
    
  }



 const [screenWidth, setScreenWidth] = useState(window.innerWidth);
 // Data arrays for the curves
 const [data, setData] = useState([
  [0,0],
  [100, 50],
  [200, 100],
  [300, 150],
  [400, 150],
  [500, 120],
  [600, 100],
]);

const [data2, setData2] = useState([
  [600, 0],
  [500, 50],
  [400, 100],
  [300, 150],
  [200, 150],
  [100, 120],
  [0, 100],
]);





function handleResize() {
  setScreenWidth(window.innerWidth);
}

// This useEffect hook is for destroying the above
// mentioned circles on mount and
// also for handling the resizing of svg elements
useEffect(() => {
  DestroyCircles();
  handleResize(); // Call handleResize immediately when the component mounts
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  // This useEffect hook is for updating the data array
  // every 1/60th of a second.
  // This is what animates the curve.
  useEffect(() => {
    const interval = setInterval(() => {
      setData(data.map((point, index) => [point[0], 80 * Math.sin(index + Date.now() / 1000) + 100])); // 80 is the amplitude, 100 is the offset
    }, 1000/60); // 60fps right now, depending on the device it could be changed, i guess :d
    return () => clearInterval(interval);
  }, [data]);
  
  // Same thing as above, but for the second curve
  useEffect(() => {
    const interval = setInterval(() => {
      setData2(data2.map((point, index) => [point[0], 80 * Math.sin(index + Date.now() / 1000) + 100]));
    }, 1000/60);
    return () => clearInterval(interval);
  }, [data2]);

  return (
    <div style={{position: 'relative'}}>
      <svg width={screenWidth} height="250" style={{position: 'absolute', top: 0, left: -300}}>
        <NaturalCurve
          data={data}
          stroke="#3B3B54"
          fill="transparent"
        >
        </NaturalCurve>
      </svg>
      <svg width={screenWidth} height="250" style={{position: 'absolute', top: 0, left: -300}}>
        <NaturalCurve
          data={data2}
          stroke="#3B3B54"
          fill="transparent"
        >
        </NaturalCurve>
      </svg>
    </div>
  );
};

// Exactly the same as the above component, but with a transform: scaleY(-1) on the svg element
// DRY? :D No, actually, I am very hydrated, thank you for asking :P.
const FlippedCurveLine = () => {

  function DestroyCircles () {
    let circles = document.getElementsByTagName("circle");
    for (let i = 0; i < circles.length; i++) {
      circles[i].remove();
    }
    if ( circles.length > 0 ) DestroyCircles();
  }
  const [screenWidth, setScreenWidth] = useState(600);

  const [data, setData] = useState([
    [0,0],
    [100, 50],
    [200, 100],
    [300, 150],
    [400, 150],
    [500, 120],
    [600, 100],
  ]);
  
  const [data2, setData2] = useState([
    [600, 0],
    [500, 50],
    [400, 100],
    [300, 150],
    [200, 150],
    [100, 120],
    [0, 100],
  ]);
  

  function handleResize() {
    setScreenWidth(window.innerWidth);
  }


  useEffect(() => {
    DestroyCircles();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(data.map((point, index) => [point[0], 50 * Math.sin(index + Date.now() / 1000) + 100]));
    }, 1000/60);
    return () => clearInterval(interval);
  }, [data]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData2(data2.map((point, index) => [point[0], 50 * Math.sin(index + Date.now() / 1000) + 100]));
    }, 1000/60);
    return () => clearInterval(interval);
  }, [data2]);


  return (
    <div style={{position: 'relative'}}>
      <svg width={screenWidth} height="250" style={{position: 'absolute', top: 0, left: -300, transform: 'scaleY(-1)'}}>
        <NaturalCurve
          data={data}
          stroke="#3B3B54"
          fill="transparent"
        >
        </NaturalCurve>
      </svg>
      <svg width={screenWidth} height="250" style={{position: 'absolute', top: 0, left: -300, transform: 'scaleY(-1)'}}>
        <NaturalCurve
          data={data2}
          stroke="#3B3B54"
          fill="transparent"
        >
        </NaturalCurve>
      </svg>
    </div>
  );
};

export default CurveLine;
export { FlippedCurveLine };