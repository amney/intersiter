import React from 'react'
import {Card, CardText, CardHeader} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import {saveButton} from './style.css'


class ConfigSection extends React.Component {

  render() {
    return (
      <div>
          <CardHeader title={this.props.title} subtitle={this.props.subtitle} />
          <CardText expandable={true}>
              {this.props.children}
          <RaisedButton label="Save" className={saveButton} disabled={!this.props.canSave} onClick={this.props.onSave}/>
          </CardText>
      </div>
    )
  }

}

export default ConfigSection
