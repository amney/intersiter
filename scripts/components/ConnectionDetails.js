import React from 'react';
import autobind from 'autobind-decorator';

import ConfigSection from './ConfigSection'

/* import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox';
   import FormsyDate from 'formsy-material-ui/lib/FormsyDate';
   import FormsyRadio from 'formsy-material-ui/lib/FormsyRadio';
   import FormsyRadioGroup from 'formsy-material-ui/lib/FormsyRadioGroup';
   import FormsySelect from 'formsy-material-ui/lib/FormsySelect';
   import FormsyText from 'formsy-material-ui/lib/FormsyText';
   import FormsyTime from 'formsy-material-ui/lib/FormsyTime';
   import FormsyToggle from 'formsy-material-ui/lib/FormsyToggle'; */

class ConnectionDetails extends React.Component {

  render() {
    return (
      <ConfigSection title="Connection Details" subtitle="How do I speak to this APIC and where is the intersite instance running?">
        <Formsy.Form onValid={ null } onInvalid={ null } onValidSubmit={ null }>
          <input type="text" name="usernameFake" style={ {  display: 'none'} } />
          <input name="passwordFake" type="password" style={ {  display: 'none'} } />
          <FormsyText required name="sitename" hintText="Sitename" floatingLabelText="Sitename" />
          <FormsyText required name="address" validationError="Must be a valid IP address or DNS name" hintText="APIC address" floatingLabelText="APIC address" />
          <FormsyText required name="username" hintText="Username" floatingLabelText="Username" />
          <FormsyText required name="password" hintText="Password" floatingLabelText="Password" type="password" />
          <FormsyText required name="interiste" hintText="Intersite address" floatingLabelText="Intersite address" />
          <div style={ {  display: 'inline-block',  width: 200} }>
            <FormsyToggle name='protocol' label="Use HTTPS?" defaultChecked={ true } />
          </div>
        </Formsy.Form>
      </ConfigSection>
      );
  }

}

export default ConnectionDetails;
