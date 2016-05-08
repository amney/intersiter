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

@connect(({intersiter, sites}) => ({reachable: sites[intersiter.site].reachable}))
class SitelocalConfig extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Card style={{ minHeight: '100%'}}>
        <CardHeader subtitle="Site-local Configuration - Site A" style={{height:40, paddingTop: 27}}/>
                  <CardText>
                    <div className={row}  style={{marginBottom: 20}}>
                      { this.props.reachable ?
                        <div className={siteLocal} >
                          <SharedEPGs /> 
                          <Divider />
                        </div> : null
                      }
                    </div>

                    <div className="row"  style={{marginBottom: 20}}>
                      { this.props.reachable ?
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

}

export default SitelocalConfig
