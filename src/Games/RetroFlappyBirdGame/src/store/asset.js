import { extendObservable} from 'mobx';

export class baseObj {

  constructor(id, cx, cy){
      // this.cx = cx;
      // this.cy = cy;
      extendObservable(this, {
          cx: cx,
          cy: cy,
      })

      this.id = id


  }

}

export class bg extends baseObj{}

export class fg extends baseObj{}

export class bird extends baseObj{

  constructor(id, cx, cy) {
    super(id, cx, cy)
    extendObservable(this, {
      frame : 0,
      velocity : 0,
      rotation : 0,
    })
  }

  //Static properties which dont change over time
  animation = [0, 1, 2, 1]; // animation sequence
  radius = 12;
  gravity = 0.25;
  _jump = 4.6;
}

export class pipe extends baseObj {
  type;
  constructor(id, cx, cy, type) {
    super(id, cx, cy)
    this.type = type
  }
}
