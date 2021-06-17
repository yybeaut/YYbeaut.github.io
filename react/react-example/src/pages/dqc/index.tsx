import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { DqcLayout } from '../../components/common/DqcLayout';

import { DQC } from '../../constants/menuList';
import Overview from './overview';
import Rules from './rules';
import Query from './query';

// const lintArr = [Overview, Rules, Query];

const DQCC: React.FC = (props: any) => {
  console.log(props, props.match, 'match')
const { path } = props.match;
  return (
    <DqcLayout menuList={DQC}>
      <Router>
        <Switch>
            <Route path={`${path}/overview`} render={() => <Overview />} />
            <Route path={`${path}/rules`} render={() => <Rules />} />
            <Route path={`${path}/query`} render={() => <Query />} />
        </Switch>
      </Router>
    </DqcLayout>
  )
};

export default DQCC

