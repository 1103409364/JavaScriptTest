class Tab {
    constructor({ nav, panels }) {
        this.nav = document.querySelector(`.${nav}`);
        this.navlis = this.nav.querySelectorAll('li')
        this.panels = document.querySelectorAll(`.${panels} li`)
        this.tabIndex = 0;
        this.addEvent();

        console.log(this.panels);
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