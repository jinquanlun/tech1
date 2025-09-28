import { LetterShuffler, LetterShufflerOptions } from './letterShuffler';
import { animationLoop } from './animationLoop';

export interface WordShufflerOptions {
  duration?: number;
}

export class WordShuffler {
  private wrapper: HTMLElement;
  private timer: number = 0;
  private lettersShown: number = 0;
  private letterDuration: number;
  private lettersShuffler: LetterShuffler[] = [];
  private arrayOfLetters: string[];
  private duration: number;
  private update: () => void;

  constructor(wrapper: HTMLElement, words: string, options: WordShufflerOptions = {}) {
    const { duration = 0.2 } = options;

    this.wrapper = wrapper;
    this.wrapper.innerHTML = '';

    this.timer = 0;
    this.lettersShown = 0;
    this.letterDuration = duration * 60;
    this.arrayOfLetters = [...words];
    this.duration = this.letterDuration * this.arrayOfLetters.length;

    this.arrayOfLetters.forEach((letter) => {
      const letterWrapper = document.createElement('span');
      letterWrapper.className = 'letter-wrapper';
      this.wrapper.appendChild(letterWrapper);
      const letterShuffler = new LetterShuffler(letterWrapper, letter, {
        duration: this.letterDuration,
      });
      this.lettersShuffler.push(letterShuffler);
    });

    this.update = this._update.bind(this);
    this.timer = 0;
  }

  show(): void {
    this.timer = 0;
    this.lettersShown = 0;
    animationLoop.add(this.update);
  }

  private _update(): void {
    this.timer += 1;
    if (this.timer > (this.letterDuration * this.lettersShown)) {
      if (this.lettersShown < this.lettersShuffler.length) {
        this.lettersShuffler[this.lettersShown].show();
        this.lettersShown += 1;
      }
    }

    if (this.timer >= this.duration) {
      animationLoop.remove(this.update);
    }
  }

  destroy(): void {
    animationLoop.remove(this.update);
    this.lettersShuffler.forEach(shuffler => shuffler.destroy());
  }
}