import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['indicator', 'slide', 'slideContainer', 'prev', 'next'];

  static values = {
    activeSlide: { type: Number, default: 0 },
  };

  activeSlideValueChanged(value, previousValue) {
    this.previousActiveSlide = previousValue;
    this.setActiveSlide();
  }

  async goToSlide(e) {
    e.preventDefault();
    this.activeSlideValue = e.params.index;
  }

  async nextSlide() {
    this.activeSlideValue = Math.min(this.activeSlideValue + 1, this.slideCount - 1);
  }

  async prevSlide() {
    this.activeSlideValue = Math.max(this.activeSlideValue - 1, 0);
  }

  setActiveIndicator() {
    this.indicatorTargets.forEach((indicator, index) => {
      indicator.classList.remove('active', 'active-left', 'active-right');

      if (index === this.activeSlideValue) {
        indicator.classList.add('active');
      } else if (index < this.activeSlideValue) {
        indicator.classList.add('active-left');
      } else if (index > this.activeSlideValue) {
        indicator.classList.add('active-right');
      }
    });
  }

  setActiveSlide() {
    const transitionDuration = Math.min(
      (this.activeSlideValue - this.previousActiveSlide) * 400,
      1000
    );
    this.slideContainerTarget.style.transitionDuration = `${transitionDuration}ms`;

    this.slideContainerTarget.style.transform = `translateX(-${this.activeSlideValue * 100}vw)`;

    this.setActiveIndicator();
  }

  get slideCount() {
    return this.slideTargets.length;
  }
};
