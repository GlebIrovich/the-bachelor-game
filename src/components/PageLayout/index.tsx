import React, { FC } from 'react';

import Navbar from '../Navbar';

const PageLayout: FC = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default PageLayout
