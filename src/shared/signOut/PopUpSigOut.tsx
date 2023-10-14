import React from 'react';
import Popup from 'reactjs-popup';

interface IPopupProps {
    trigger:JSX.Element | ((isOpen: boolean) => JSX.Element) | undefined
}

export const ModalExit = ({trigger}:IPopupProps) => (
  <Popup trigger={trigger} modal>
    <span> Modal content </span>
  </Popup>
);