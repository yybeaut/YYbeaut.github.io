
import React, { Fragment, useRef, useEffect } from "react";

// import { BasicLine } from "@tencent/tea-chart/lib/basicline";
import { BasicLine } from "tea-chart/lib/basicline";
// import { BasicPie } from "@tencent/tea-chart/lib/basicpie";
import { BasicPie } from "tea-chart/lib/basicpie";

import {
  Layout,
} from 'tea-component';
// } from '@tencent/tea-component';

const { Content } = Layout;
const Rules = () => {
  const data = [
    { type: "防止主机瘫痪", time: "0:00", value: 10 },
    { type: "防止主机瘫痪", time: "1:00", value: 20 },
    { type: "防止主机瘫痪", time: "2:00", value: 50 },
    { type: "避免数据泄露", time: "3:00", value: 60 },
    { type: "避免数据泄露", time: "4:00", value: 20 },
    { type: "避免数据泄露", time: "5:00", value: 72 },
    { type: "避免数据泄露", time: "6:00", value: 98 },
    { type: "防止页面篡改", time: "7:00", value: 60 },
    { type: "防止页面篡改", time: "8:00", value: 70 },
    { type: "防止页面篡改", time: "9:00", value: 58 },
    { type: "防止主机瘫痪", time: "10:00", value: 22 },
    { type: "防止主机瘫痪", time: "11:00", value: 68 },
    { type: "避免数据泄露", time: "12:00", value: 83 },
  ];

  return (
    <Content>
      <Content.Header title="质量jiankonggailan"/>
      <Content.Body>
        <Fragment>
        <h3>折线</h3>
        <BasicLine
          height={250}
          position="time*value"
          dataSource={data}
          xAxis={{
            title: {
              text: "时间",
            },
          }}
          yAxis={{
            title: {
              text: "数值",
            },
          }}

        />
        <h3>饼图</h3>
        <BasicPie
          height={250}
          dataSource={data}
          position="value"
          color="type"
        />
      </Fragment>
      </Content.Body>
    </Content>

  );
}

export default Rules;
