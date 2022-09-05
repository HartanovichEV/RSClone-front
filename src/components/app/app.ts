import { addListeners, addUserListeners } from '../controller/listeners/listeners';
import { isAuthorized } from '../model/api/authorization';
import Footer from '../view/footer/footer';
import Header from '../view/header/header';
import Main from '../view/main/main';
import Modal from '../view/modal/modal';

export default class App {
  body: HTMLElement;

  header: Header;

  main: Main;

  footer: Footer;

  constructor() {
    this.body = document.body;
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  async init(page = 'main'): Promise<HTMLElement> {

    const isAuth = await isAuthorized();
    if (page === 'main' && isAuth) window.location.href = document.location.origin + '/user';
    else if (page === 'user' && !isAuth) window.location.href = document.location.origin;
    const modals: HTMLDivElement = new Modal().render();

    this.body.append(modals);
    this.body.append(this.header.render(page));
    this.body.append(this.main.render(page));
    this.body.append(this.footer.render());
    switch (page) {
      case ('main'): {
        addListeners();
        break;
      }
      case ('user'): {
        addUserListeners();
        break;
      }
    }
    sessionStorage.setItem('sortBy', 'asc');
    return this.body;
  }
}