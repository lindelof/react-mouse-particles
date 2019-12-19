# react-mouse-particles

[![NPM](https://img.shields.io/npm/v/react-mouse-particles.svg)](https://www.npmjs.com/package/react-mouse-particles) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A mouse particle effect react component

A very fun react library that can be used to create mouse particle effects, which are as cool as meteors or fireballs.

### Another react particle background animation library is here [https://github.com/lindelof/particles-bg](https://github.com/lindelof/particles-bg)

### Online demo
* demo1 [https://stackblitz.com/edit/react-a6pm3w](https://stackblitz.com/edit/react-a6pm3w?file=index.js)
* demo2 [https://stackblitz.com/edit/react-bpv9fc](https://stackblitz.com/edit/react-bpv9fc?file=index.js)

![](https://github.com/lindelof/react-mouse-particles/blob/master/image/01.gif?raw=true)


## Install

```bash
npm install --save react-mouse-particles
```

## Usage

```jsx
import React, { Component } from 'react'

import MouseParticles from 'react-mouse-particles'

class Example extends Component {
  render () {
    return (
      <>
        <div>...</div>
        <MouseParticles g={1} color="random" cull="col,image-wrapper"/>
      </>
    )
  }
}
```

## Parameter Description
```jsx
<MouseParticles g={1} num={6} color="random" cull="stats,image-wrapper" level={6} />
```
#### * `g` - Whether to add gravity: Number

#### * `num` - The number of particles emitted each time: Number

#### * `radius` - The radius of every particle: Number

#### * `life` - The life of every particle: Number

#### * `color` - Particle color, array or string
```javascript
 <MouseParticles g={1} color="random" />
 // or

 <MouseParticles g={1} color={["#ff0000", "#ccdfs2"]} />
```

#### * `cull` - Eliminate dom's className without triggering animation
```javascript
 <MouseParticles cull="container,image-wrapper" />
```

#### * `level` - Detect levels of culling animation

## License

https://opensource.org/licenses/MIT
