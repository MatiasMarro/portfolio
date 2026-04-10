import React, { useState } from 'react';

import WinXP from 'WinXP';
import Loader from 'components/Loader';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Loader onLogin={() => setLoggedIn(true)} />;
  }

  return <WinXP />;
};

export default App;
