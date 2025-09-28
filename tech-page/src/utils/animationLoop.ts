class AnimationLoop {
  private _idRAF: number = -1;
  private _count: number = 0;
  private _listeners: Array<() => void> = [];
  private _binds: { update: () => void };

  constructor() {
    this._binds = {
      update: this._update.bind(this)
    };
  }

  private _update(): void {
    let listener: (() => void) | null = null;
    let i = this._count;
    while (--i >= 0) {
      listener = this._listeners[i];
      if (listener) {
        listener.call(this);
      }
    }
    this._idRAF = requestAnimationFrame(this._binds.update);
  }

  start(): void {
    this._update();
  }

  stop(): void {
    cancelAnimationFrame(this._idRAF);
  }

  add(listener: () => void): void {
    const idx = this._listeners.indexOf(listener);
    if (idx >= 0) {
      return;
    }
    this._listeners.push(listener);
    this._count++;
  }

  remove(listener: () => void): void {
    const idx = this._listeners.indexOf(listener);
    if (idx < 0) {
      return;
    }
    this._listeners.splice(idx, 1);
    this._count--;
  }
}

export const animationLoop = new AnimationLoop();
animationLoop.start();