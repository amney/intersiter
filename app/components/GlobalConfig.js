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
          <ConfigSection title="No global config needed in version 1.0" subtitle="">
            <p>Intersiter orchestrates multi-site ACI fabrics by extending local EPGs to each remote site</p>
            <br />
            <p>To begin, configure one or more sites from the left hand menu</p>
          </ConfigSection>
      </ConfigTab>
    )
  }

}

export default GlobalConfig
