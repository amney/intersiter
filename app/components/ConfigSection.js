import React from 'react'
import {Card, CardText, CardHeader} from 'material-ui/Card'

class ConfigSection extends React.Component {

  render() {
    return (
      <div>
          <CardHeader title={this.props.title} subtitle={this.props.subtitle} />
          <CardText expandable={true}>
              {this.props.children}
          </CardText>
      </div>
    )
  }

}

export default ConfigSection
