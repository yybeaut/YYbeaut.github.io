import React from 'react';
import Overview from '../pages/dqc/overview';
import Rules from '../pages/dqc/rules';
import Query from '../pages/dqc/query';



// 数据质量
const DQC = React.lazy(() =>
  import(/* webpackChunkName: "DQC" */ '../pages/dqc'),
);
export const routes = [
  {
    path: '/dqc',
    component: DQC,
    routes: [
      {
        path:'/overview',
        component: Overview
      },
      {
        path:'/rules',
        component: Rules
      },
      {
        path:'/query',
        component: Query
      }
    ]
  }
];

