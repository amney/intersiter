import React from 'react';
import autobind from 'autobind-decorator';

import ConfigSection from './ConfigSection'
import EPGSelector from './EPGSelector'

class SharedEPG extends React.Component {

  render() {
    return (
      <ConfigSection title="Shared End Point Groups" subtitle="Choose the EPGs that you wish to be advertised at external sites">
              <EPGSelector />
      </ConfigSection>
    );
  }

}

export default SharedEPG;
