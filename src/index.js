import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";

class MouseParticles extends React.Component {
  constructor(props) {
    super(props);

    this.ease = 0.7;
    this.level = 0;
    this.LEVEL = 5;
    this._allowEmitting = true;
    this.renderProton = this.renderProton.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);

    this.createContainerDom();
  }

  createContainerDom() {
    this.dom = document.createElement("div");
    this.dom.style.position = "fixed";
    this.dom.style.left = "0px";
    this.dom.style.top = "0px";
    this.dom.style.zIndex = 9999;
    this.dom.pointerEvents = "none";
    this.dom.id = `rmps_${(Math.random() * 999999) >> 0}`;
    document.body.appendChild(this.dom);
  }

  componentWillUnmount() {
    try {
      document.body.removeEventListener("mousemove", this.mouseMoveHandler, false);
      document.body.removeEventListener("mousedown", this.mouseDownHandler, false);
      document.body.removeEventListener("mouseup", this.mouseUpHandler, false);
      RAFManager.remove(this.renderProton);
      this.proton.destroy();
    } catch (e) {}
  }

  componentDidMount() {
    this.onCanvasInited();
    this.addMouseEventListener();
    this.setCullList();
  }

  onCanvasInited() {
    this.createProton();
    RAFManager.add(this.renderProton);
  }

  addMouseEventListener() {
    document.body.addEventListener("mousemove", this.mouseMoveHandler, false);
    document.body.addEventListener("mousedown", this.mouseDownHandler, false);
    document.body.addEventListener("mouseup", this.mouseUpHandler, false);
  }

  mouseDownHandler(e) {}
  mouseUpHandler(e) {}

  mouseMoveHandler(e) {
    if (this.isCullDom(e)) return;
    let x,
      y = 0;

    x = e.clientX;
    y = e.clientY;

    this.emitter.p.x += (x - this.emitter.p.x) * this.ease;
    this.emitter.p.y += (y - this.emitter.p.y) * this.ease;

    if (this._allowEmitting) this.emitter.emit("once");
  }

  setCullList() {
    this.cullClassList = this.props.cull || "";
    this.cullClassList = this.cullClassList.split(",");

    this.LEVEL = this.props.level || 6;
  }

  isCullDom(e) {
    this.level = 0;

    if (isInputText(e.target)) return true;
    if (isTextBox(e.target)) return true;
    if (!this.cullClassList || !this.cullClassList.length) return false;

    return this.isContain(e.target, this.cullClassList);
  }

  isContain(element, cullClassList) {
    if (this.level >= this.LEVEL) return false;
    if (!element) return false;
    if (!element.classList) return false;
    if (element === document.body) return false;

    for (let i = 0; i < cullClassList.length; i++) {
      if (element.classList.contains(cullClassList[i])) {
        return true;
      }
    }
    this.level++;

    return this.isContain(element.parentNode, cullClassList);
  }

  createProton(canvas) {
    this.proton = new Proton();

    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(this.props.num || 3);
    emitter.damping = 0.008;

    const life = this.props.life ? new Proton.Life(this.props.life) : new Proton.Life(0.2, 0.5);
    const radius = this.props.radius ? new Proton.Radius(this.props.radius) : new Proton.Radius(2, 5);
    const color = this.props.color || "random";
    const g = this.props.g;
    const v = this.props.v || 0.65;
    const tha = this.props.tha ? new Proton.Span(this.props.tha[0], this.props.tha[1]) : new Proton.Span(0, 360);

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(radius);
    emitter.addInitialize(life);
    emitter.addInitialize(new Proton.Velocity(new Proton.Span(v), tha, "polar"));

    emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.25, 0.55)));
    emitter.addBehaviour(new Proton.Color(color));
    emitter.addBehaviour(new Proton.Scale(1, 0.1));
    emitter.addBehaviour(new Proton.RandomDrift(10, 10, 0.2));
    if (g) {
      emitter.addBehaviour(new Proton.G(parseFloat(g)));
    }

    this.proton.addEmitter(emitter);
    const renderer = new Proton.DomRenderer(this.dom);
    this.proton.addRenderer(renderer);
    this.emitter = emitter;
  }

  renderProton() {
    this.proton && this.proton.update();
  }

  render() {
    return <React.Fragment />;
  }
}

// utils function
function isInputText(element) {
  return element instanceof HTMLInputElement && element.type == "text";
}

function isTextBox(element) {
  let tagName = element.tagName.toLowerCase();
  if (tagName === "textarea") return true;
  if (tagName !== "input") return false;
}

export default MouseParticles;
