import React from 'react';
import autobind from 'autobind-decorator';

import ConfigSection from './ConfigSection'
import EPGSelector from './EPGSelector'

class ConsumableEPG extends React.Component {

  render() {
    return (
      <ConfigSection title="Consumable External End Point Groups" subtitle="Choose the external EPGs that you wish neighbour EPGs to be installed on">
              <EPGSelector />
      </ConfigSection>
    );
  }

}

export default ConsumableEPG;
