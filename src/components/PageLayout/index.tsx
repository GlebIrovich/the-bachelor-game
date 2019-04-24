import React, { FC } from 'react';

import Navbar from '../Navbar';

interface Props {
  gameName: string;
}

const PageLayout: FC<Props> = ({children, gameName}) => {
  return (
    <div>
      <Navbar gameName={gameName} />
      {children}
    </div>
  )
}

export default PageLayout
