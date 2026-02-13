/*** 11.11.2024 /Node.js from trial for UazFan project ***/

/**
 * Набор статических методов для Toast
 */
export const StaticsMethodsToast = {
    /**
     * Всплывающее уведомление
     * @param params
     */
    toast: function (params) {
        return new Toast(params);
    }
}

/**
 * Набор методов экземпляра UF библиотеки для Toast
 */
export const InstanceMethodsToast = {

}

class Toast {
    constructor(params) {
        this._title = params['title'] === false ? false : params['title'] || '...';
        this._text = params['text'] || '...';
        this._type = params['type'] || 'default';
        this._autohide = params['autohide'] && true;
        this._interval = +params['interval'] || 5000;
        this._hideEvent = params['hideEvent'] || false;
        this.create();
        this._el.addEventListener('click', (e) => {
            if (e.target.classList.contains('toast__close')) {
                this.hide();
            }
        });
        this.show();
    }

    create() {
        const el = document.createElement('div');
        el.classList.add('toast');
        el.classList.add(`toast_${this._type}`);
        let html = `{header}<div class="toast__body"></div><div class="toast__close"></div>`;
        const htmlHeader = this._title === false ? '' : '<div class="toast__header"></div>';
        html = html.replace('{header}', htmlHeader);
        el.innerHTML = html;
        if (this._title) {
            el.querySelector('.toast__header').textContent = this._title;
        } else {
            el.classList.add('message');
        }
        el.querySelector('.toast__body').innerHTML = this._text;
        this._el = el;
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.classList.add('toast-container');
            document.body.append(container);
        }
        document.querySelector('.toast-container').prepend(this._el);
    }

    show() {
        this._el.classList.add('toast_showing');
        this._el.classList.add('toast_show');
        window.setTimeout(() => {
            this._el.classList.remove('toast_showing');
        });
        if (this._autohide) {
            setTimeout(() => {
                this.hide();
            }, this._interval);
        }
    }

    hide() {
        this._el.classList.add('toast_showing');
        this._el.addEventListener('transitionend', () => {
            this._el.classList.remove('toast_showing');
            this._el.classList.remove('toast_show');
            this._el.remove();
            if (typeof this._hideEvent === 'function') {
                this._hideEvent();
            }
        }, {
            once: true
        });
    }
}
