// Type definitions for particles-bg 2.4.0
// Project: https://github.com/lindelof/particles-bg
// Definitions by: Dragoș Străinu https://github.com/strdr4605

import React from 'react';

declare module "react-mouse-particles" {

  export type ConfigPositionProp = any;
  // Some typing error actual type should be:

  export interface Props {
    num?: number;
    color?: any;
    radius?: number;
    cull?: string;
    life?: number;
    tha?: number;
    alpha?: number;
    v?: number;
    g?: number;
  }

  class MouseParticles extends React.Component<Props, any> {}

  export default MouseParticles;
}
