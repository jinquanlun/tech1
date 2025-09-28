import { animationLoop } from './animationLoop';

export interface LetterShufflerOptions {
  duration?: number;
}

export class LetterShuffler {
  private SHUFFLING_VALUES = [
    '!', '§', '%', '&', '/', '(', ')', '=', '?', '_', '<',
    '>', '^', '°', '*', '#', '-', ':', ';', '~', '+', '|'
  ];

  public id: number;
  private animate: boolean = false;
  private wrapper: HTMLElement;
  private letter: string;
  private letterToShown: string;
  private timer: number = 0;
  private duration: number;
  private scaleTargeted: number = 2;
  private update: () => void;

  constructor(wrapper: HTMLElement, letter: string, options: LetterShufflerOptions = {}) {
    const { duration = 30 } = options;

    this.id = Math.random();
    this.wrapper = wrapper;
    this.letter = letter;
    this.letterToShown = this.letter;
    this.wrapper.innerHTML = '';
    this.timer = 0;
    this.duration = duration;

    this.update = this._update.bind(this);

    // Adjust styling for special characters
    if (/[+\-| ]/.test(letter)) {
      this.wrapper.classList.add('special-char');
    } else {
      this.duration *= 2.1;
    }
  }

  show(letter: string = this.letter): void {
    this.animate = true;
    this.timer = 0;
    this.letterToShown = letter;
    animationLoop.add(this.update);
  }

  hide(): void {
    this.show('');
  }

  private _update(): void {
    if (this.animate) {
      this.timer++;
      if (this.timer < this.duration) {
        this.wrapper.innerHTML = this.SHUFFLING_VALUES[Math.floor(Math.random() * this.SHUFFLING_VALUES.length)];
        this.wrapper.style.transform = `scale(${(this.timer / this.duration) * 0.9})`;
      } else {
        this.wrapper.innerHTML = this.letterToShown;
        this.wrapper.style.transform = 'scale(1)';
        animationLoop.remove(this.update);
        this.animate = false;
      }
    }
  }

  destroy(): void {
    animationLoop.remove(this.update);
  }
}