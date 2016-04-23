import React from 'react';
import autobind from 'autobind-decorator';

import ConfigTab from './ConfigTab'
import MirroredEPG from './MirroredEPG'

class GlobalConfig extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ConfigTab title="Global Configuration">
          <MirroredEPG />
      </ConfigTab>
    );
  }

}

export default GlobalConfig;
