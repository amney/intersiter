import React from 'react'
import autobind from 'autobind-decorator'

import {Card, CardText, CardHeader} from 'material-ui/Card'

import SharedEPGs from './SharedEPGs'
import ConsumableEPGs from './ConsumableEPGs'
import ConnectionDetails from './ConnectionDetails'
import Divider from 'material-ui/Divider'
import {row} from 'flexboxgrid'
import {siteLocal} from './style.css'

import { connect } from 'react-redux'

@connect(({intersiter, sites}) => ({sites, idx: intersiter.site}))
class SitelocalConfig extends React.Component {
  constructor() {
    super()
  }

  render() {

    if(this.props.idx){
      const site = this.props.sites[this.props.idx]
      const reachable = site.reachable > 0
      const siteName = site.name

      return (
      <Card style={{ minHeight: '100%'}}>
        <CardHeader subtitle={`Site-local Configuration - ${siteName}`} style={{height:40, paddingTop: 27}}/>
        <CardText>
          <div className={row}  style={{marginBottom: 20}}>
            { reachable ?
              <div className={siteLocal} >
                <SharedEPGs />
                <Divider />
              </div> : null
            }
          </div>

          <div className="row"  style={{marginBottom: 20}}>
            { reachable ?
              <div className={siteLocal} >
                <ConsumableEPGs />
                <Divider />
              </div> : null
            }
          </div>

          <div className="row" style={{marginBottom: 20}}>
            <div className={siteLocal}>
              <ConnectionDetails />
            </div>
          </div>

        </CardText>
      </Card>
    )
    }
    else {
      return (
      <Card style={{ minHeight: '100%'}}>
        <CardHeader subtitle={`Please choose a site from the left hand navigation`} style={{height:40, paddingTop: 27}}/>
      </Card>
      )
    }
  }

}

export default SitelocalConfig
