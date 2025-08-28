import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['container'];

  connect() {
    setTimeout(() => {
      this.open();
    }, 0);
  }

  open() {
    if (document.cookie.includes('popup_shown=1')) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    this.containerTarget.classList.remove('hidden');
    document.body.classList.add('overflow-hidden', 'w-full', 'max-h-screen');
  }

  close() {
    this.containerTarget.remove();
    document.body.classList.remove('overflow-hidden', 'w-full', 'max-h-screen');

    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `popup_shown=1; expires=${date.toUTCString()}; path=/`;
  }
};
