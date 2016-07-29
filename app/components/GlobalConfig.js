import React from 'react'
import autobind from 'autobind-decorator'
import ConfigSection from './ConfigSection'
import ConfigTab from './ConfigTab'
import MirroredEPG from './MirroredEPG'

import {example} from './style.css'

class GlobalConfig extends React.Component {
  constructor() {
    super()
  }

  //<MirroredEPG />
  render() {
    return (
      <ConfigTab title="Global Configuration">
          <ConfigSection title="Intersiter Help" subtitle="Intersiter orchestrates multi-site ACI fabrics by extending local EPGs to each remote site">
            <p><strong>No global configuration needed in version 1.0</strong></p>
          </ConfigSection>
      </ConfigTab>
    )
  }

}

export default GlobalConfig
