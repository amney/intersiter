import React from 'react'
import {Card, CardText, CardHeader} from 'material-ui/Card'
import {row} from 'flexboxgrid'
import {configTab} from './style.css'

class ConfigTab extends React.Component {

  render() {
    return (
      <Card style={{ minHeight: '100%'}}>
        <CardHeader subtitle={this.props.title} style={{height:40, paddingTop: 27}}/>
        <CardText>
          <div className={row}  style={{marginBottom: 20}}>
            <div className={configTab} >
                  {this.props.children}
            </div>
          </div>
        </CardText>
      </Card>
    )
  }

}

export default ConfigTab
