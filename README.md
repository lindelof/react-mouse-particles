# react-mouse-particles

[![NPM](https://img.shields.io/npm/v/react-mouse-particles.svg)](https://www.npmjs.com/package/react-mouse-particles) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A mouse particle effect react component

A very fun react library that can be used to create mouse particle effects, which are as cool as meteors or fireballs. I often want to use react to do something fun. Using this component may make your page instantly glorious.

#### Another react particle background animation library is here [https://github.com/lindelof/particles-bg](https://github.com/lindelof/particles-bg)

### Online demo
* demo(01) [https://stackblitz.com/edit/react-mouse-particle-other](https://stackblitz.com/edit/react-mouse-particle-other?file=index.js)
* demo(02) [https://stackblitz.com/edit/react-mouse-particles](https://stackblitz.com/edit/react-mouse-particles?file=index.js)

![](https://github.com/lindelof/react-mouse-particles/blob/master/image/01.gif?raw=true)

![](https://github.com/lindelof/react-mouse-particles/blob/master/image/02.gif?raw=true)


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

key | describe |type | example
----|-----|-----|------
`g` | Whether to add gravity | number | `1`
`num` | The number of particles emitted each time | number | `3`
`radius` | The radius of every particle | number | `10`
`alpha` | The alpha of every particle | number | `.1`
`tha` | The Particle emitter angle | number | `20`
`v` | The Particle emitter Particle velocity | number | `0.5`
`life` | The life of every particle | number | `1.2`
`color` | Particle color  | array or string | `<MouseParticles g={1} color="random" /> // or <MouseParticles g={1} color={["#ff0000", "#ccdfs2"]} />`
`cull` | Eliminate dom's className without triggering animation  | string | `<MouseParticles cull="container,image-wrapper" />`
`level` | Detect levels of culling animation  | number | `6`

---

## Contribution
I very much hope that you can work with me to modify the code. I also have a lot of fun ideas. Maybe you can join me to implement it.

## License

https://opensource.org/licenses/MIT
