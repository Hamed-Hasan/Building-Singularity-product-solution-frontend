import React from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import './Typewriter.css';
// import '../Pages/style.css'
const TypeWriter = () => {
 

  return (
    <div className='typewriter-text'>
      <TypeWriterEffect
        textStyle={{
          fontWeight: 800,
          color: "#FFA001",
        }}
        startDelay={2000}
        cursorColor="#3F3D56"
        multiText={[
          "Hi, I'm Hamed Hasan at Arraytics",
          "Crafting Excellence with Arraytics",
          "Enthusiastic Data Scientist at Arraytics",
          "Mastering the MERN Stack at Arraytics",
          "Weaving Magic as a Front End Maestro at Arraytics",
          "Architecting Backends with Precision at Arraytics",
          "Fueling Innovation with React.js at Arraytics",
          "Designing Dreams as a Graphic Virtuoso at Arraytics",
          "Pioneering Professionalism as a Full Stack Developer at Arraytics"
        ]}
        multiTextDelay={1000}
        typeSpeed={80}
      />
    </div>
  );
};

export default TypeWriter;
