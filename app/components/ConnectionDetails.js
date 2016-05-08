import React from 'react'
import autobind from 'autobind-decorator'

import ConfigSection from './ConfigSection'

import Formsy from 'formsy-react'
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib'

import RaisedButton from 'material-ui/RaisedButton'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as connectionCreators from '../redux/connections'

@connect(({intersiter, connections, sites}) => ({site: intersiter.site, sitename: sites[intersiter.site].name,
  connection: connections[intersiter.site]}),
  (dispatch) => bindActionCreators(connectionCreators, dispatch))
class ConnectionDetails extends React.Component {

  onValid(){
    console.log("valid")
  }

  onInvalid(){
    console.log("invalid")
  }

  onValidSubmit(data){
    console.log(data)
    this.props.saveCon(this.props.site, data)
  }

  render() {
    return (
      <ConfigSection title="Connection Details" subtitle="How do I speak to this APIC and where is the intersite instance running?" canSave={true} onSave={()=>{console.log("Saved")}}>
      <Formsy.Form onValid={ this.onValid.bind(this) } onInvalid={ this.onInvalid.bind(this) } onValidSubmit={ this.onValidSubmit.bind(this) }>
        <input type="text" name="usernameFake" style={ {  display: 'none'} } />
        <input name="passwordFake" type="password" style={ {  display: 'none'} } />

        <FormsyText required name="sitename" value={this.props.sitename} floatingLabelText="Sitename" />
        <FormsyText required name="address" value={this.props.connection.address} validationError="Must be a valid IP address or DNS name" floatingLabelText="APIC address (e.g. 192.168.0.10)" />
        <FormsyText required name="username" value={this.props.connection.username} floatingLabelText="Username" />
        <FormsyText required name="password" value={this.props.connection.password} floatingLabelText="Password" type="password" />
        <FormsyText required name="inAddr" value={this.props.connection.inAddr} floatingLabelText="Intersite address" />

        <div style={ {  display: 'inline-block',  width: 200} }>
          <FormsyToggle name="https" label="Use HTTPS?" defaultChecked={ this.props.connection.https } />
        </div>

        <br />
        <RaisedButton
          type="submit"
          label="Submit"
        />
      </Formsy.Form>
      </ConfigSection>
      )
  }

}

export default ConnectionDetails
