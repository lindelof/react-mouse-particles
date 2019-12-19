import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";

export default class MouseParticles extends React.Component {
  constructor(props) {
    super(props);

    this.ease = 0.7;
    this._allowEmitting = false;
    this.renderProton = this.renderProton.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  componentWillUnmount() {
    try {
      document.removeEventListener("mousemove", this.mouseMoveHandler, false);
      document.removeEventListener("mousedown", this.mouseDownHandler, false);
      document.removeEventListener("mouseup", this.mouseUpHandler, false);
      RAFManager.remove(this.renderProton);
      this.proton.destroy();
    } catch (e) {}
  }

  componentDidMount() {
    this.onCanvasInited(canvas);
    this.addMouseEventListener();
  }

  onCanvasInited(canvas) {
    this.createProton(canvas);
    RAFManager.add(this.renderProton);
  }

  addMouseEventListener() {
    document.addEventListener("mousemove", this.mouseMoveHandler, false);
    document.addEventListener("mousedown", this.mouseDownHandler, false);
    document.addEventListener("mouseup", this.mouseUpHandler, false);
  }

  mouseMoveHandler(e) {
    if (e.layerX || e.layerX === 0) {
      this.emitter.p.x += (e.layerX - this.emitter.p.x) * this.ease;
      this.emitter.p.y += (e.layerY - this.emitter.p.y) * this.ease;
    } else if (e.offsetX || e.offsetX === 0) {
      this.emitter.p.x += (e.offsetX - this.emitter.p.x) * this.ease;
      this.emitter.p.y += (e.offsetY - this.emitter.p.y) * this.ease;
    }

    if (this._allowEmitting) this.emitter.emit("once");
  }

  createProton(canvas) {
    this.proton = new Proton();

    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(this.props.num || 20);
    emitter.damping = 0.008;

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(30, 600));
    emitter.addInitialize(new Proton.Velocity(new Proton.Span(0.5), new Proton.Span(0, 360), "polar"));
    emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height)));

    emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.35, 0.55)));
    emitter.addBehaviour(new Proton.Color(this.getColor()));
    emitter.addBehaviour(new Proton.RandomDrift(50, 50, 0.5));
    this.proton.addEmitter(emitter);

    const renderer = new Proton.DomRenderer(dom);
    this.proton.addRenderer(renderer);
    this.emitter = emitter;
  }

  getColor() {
    let c = this.colors;
    if (this.props.color) {
      if (Array.isArray(this.props.color)) {
        c = this.props.color;
      } else {
        c = [this.props.color];
      }
    }

    return c;
  }

  renderProton() {
    this.proton && this.proton.update();
  }

  render() {
    return <React.Fragment />;
  }
}
