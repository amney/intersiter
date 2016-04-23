import React from 'react';
import autobind from 'autobind-decorator';
import ConfigSection from './ConfigSection'
import EPGSelector from './EPGSelector'


class MirroredEPG extends React.Component {

  render() {
    return (
      <ConfigSection title="Mirrored External End Point Groups" subtitle="Choose the External EPGs that you wish to be mirrored across all sites">
        <EPGSelector />
      </ConfigSection>
      );
  }

}

export default MirroredEPG;
