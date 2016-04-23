import React from 'react';
import autobind from 'autobind-decorator';

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardHeader from 'material-ui/lib/card/card-header';

import SharedEPGs from './SharedEPGs'
import ConsumableEPGs from './ConsumableEPGs'
import ConnectionDetails from './ConnectionDetails'
import Divider from 'material-ui/lib/divider';

class SitelocalConfig extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Card style={{ minHeight: '100%'}}>
        <CardHeader subtitle="Site-local Configuration - Site A" style={{height:40, paddingTop: 27}}/>
                  <CardText>
                    <div className="row"  style={{marginBottom: 20}}>
                      <div className="col-lg-12" >
                        <SharedEPGs />
                      </div>
                    </div>

                    <Divider />
                    <br />

                    <div className="row"  style={{marginBottom: 20}}>
                      <div className="col-lg-12" >
                      <ConsumableEPGs />
                      </div>
                    </div>

                    <Divider />
                    <br />

                    <div className="row" style={{marginBottom: 20}}>
                      <div className="col-lg-12" >
                        <ConnectionDetails />
                      </div>
                    </div>

                  </CardText>
                </Card>
    );
  }

}

export default SitelocalConfig;
