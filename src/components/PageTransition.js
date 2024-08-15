import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../styles/PageTransition.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const nodeRef = React.useRef(null); // Create a ref for the transition

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef} // Pass the ref to the CSSTransition
      >
        <div ref={nodeRef}> {/* Attach the ref to the DOM element */}
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;
