import React, { useState } from 'react';

import WinXP from 'WinXP';
import Loader from 'components/Loader';
import startupSound from 'assets/sounds/windows-xp-startup.wav';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    const audio = new Audio(startupSound);
    audio.volume = 0.6;
    audio.play().catch(() => {});
    setLoggedIn(true);
  }

  if (!loggedIn) {
    return <Loader onLogin={handleLogin} />;
  }

  return <WinXP />;
};

export default App;
