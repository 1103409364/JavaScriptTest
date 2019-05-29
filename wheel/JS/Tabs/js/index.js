class Tab {
    constructor({ tabClassName }) {
        this.nav = document.querySelector(`.${tabClassName} .tabs-nav`);
        this.navlis = this.nav.querySelectorAll('li')
        this.panels = document.querySelectorAll(`.${tabClassName} .tabs-panel li`)
        this.tabIndex = 0;
        this.addEvent();
    }

    addEvent() {
        this.nav.addEventListener('click', (e) => {
            e.target.classList.add('active');

            if (e.target.classList.contains('tab1')) {
                this.tabIndex = 0;
                this.active(this.tabIndex);
            } else {
                this.tabIndex = 1;
                this.active(this.tabIndex);
            }

        }, false)
    }

    active(tabIndex) {
        this.navlis.forEach((item) => {
            item.classList.remove('active');
        })

        this.panels.forEach((item) => {
            item.classList.remove('active');
        })

        this.navlis[tabIndex].classList.add('active');
        this.panels[tabIndex].classList.add('active');
    }
}