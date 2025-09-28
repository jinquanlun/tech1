import { WordShuffler, WordShufflerOptions } from './wordShuffler';

export interface TextShufflerOptions {
  durationInterval?: number;
  wordDuration?: number;
}

export class TextShuffler {
  private i: number = 0;
  private lines: WordShuffler[] = [];
  private durationInterval: number;
  private wrapper: HTMLElement;
  private intervalId: number | null = null;

  constructor(wrapper: HTMLElement, lines: string[], options: TextShufflerOptions = {}) {
    const { durationInterval = 50, wordDuration = 0.05 } = options;

    this.wrapper = wrapper;
    this.durationInterval = durationInterval;

    for (let i = 0; i < lines.length; i++) {
      this.lines.push(this._addLine(lines[i], wordDuration));
    }
  }

  private _addLine(line: string, duration: number): WordShuffler {
    const lineElm = document.createElement('p');
    lineElm.className = 'text-line';
    this.wrapper.appendChild(lineElm);
    const word = new WordShuffler(lineElm, line, { duration });
    return word;
  }

  show(): void {
    this.i = 0;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      if (this.i < this.lines.length) {
        this.lines[this.i].show();
        this.i += 1;
      }

      if (this.i >= this.lines.length) {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    }, this.durationInterval);
  }

  hide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  destroy(): void {
    this.hide();
    this.lines.forEach(line => line.destroy());
  }
}