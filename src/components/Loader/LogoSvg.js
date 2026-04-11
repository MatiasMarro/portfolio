import React from 'react';
import logo from 'assets/microsoft-windows-xp-white-logo.svg';


function LogoSvg({ width = 450, height = 250 }) {
  return (
    <img src={logo} alt="Logo" style={{ width, height }} />
  );
}

export default LogoSvg;
