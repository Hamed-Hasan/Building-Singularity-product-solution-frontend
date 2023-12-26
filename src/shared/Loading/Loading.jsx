import React, { useState } from 'react';
import { PropagateLoader  } from 'react-spinners';
import './Loading.css'
function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading completion after 3 seconds
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return (
    <div className="loading-spinner-container ">
      {isLoading ? (
        <div >
          <PropagateLoader  color="#FFA001" size={10} />
        </div>
      ) : (
        // Render your content when loading is complete
        <div>Your content goes here</div>
      )}
    </div>
  );
}
export default Loading;