import React from 'react'
import autobind from 'autobind-decorator'

import ConfigTab from './ConfigTab'
import Syncer from './Syncer'


class SyncConfig extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <ConfigTab title="Sync Configuration">
        <Syncer />
      </ConfigTab>
    )
  }

}

export default SyncConfig
