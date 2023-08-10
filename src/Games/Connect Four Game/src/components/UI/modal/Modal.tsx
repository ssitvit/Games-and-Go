import React, { FunctionComponent } from 'react';
import { createPortal } from 'react-dom';

import { backdropVariants } from '../../../frameMotinVariats/frameMotionVariants';

import { Wrapper, Backdrop } from './ModalsStyles';

const Modal: FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
  const portalElement = document.getElementById('overlays') || document.body;

  return (
    <React.Fragment>
      {createPortal(
        <Backdrop
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />,
        portalElement
      )}
      {createPortal(<Wrapper>{children}</Wrapper>, portalElement)}
    </React.Fragment>
  );
};

export default Modal;
