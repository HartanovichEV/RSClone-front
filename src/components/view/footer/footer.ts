import logo from '../../assets/svg/logo.svg';

export default class Footer {
  wrapper: HTMLElement;

  constructor() {
    this.wrapper = document.createElement('footer');
  }

  getFooter(): string {
    return `
    <footer class="footer">
      <a class="footer__logo" href="https://rs.school/js/" target="_blank">
        <img class="footer__logo-img" src=${logo} alt="logo">
      </a>
      <div class="footer__links">      
        <a class="footer__link" href="https://github.com/HartanovichEV" target="_blank">HartanovichEV</a>   
        <a class="footer__link" href="https://github.com/sahion" target="_blank">Sahion</a>   
        <a class="footer__link" href="https://github.com/Jazzzrabbit" target="_blank">Jazzzrabbit</a>   
      </div>   
      <p class="footer__year">2022 &copy</p>
    </footer>`;
  }

  render() {
    this.wrapper.innerHTML = this.getFooter();
    this.wrapper.classList.add('footer');
    return this.wrapper;
  }
}