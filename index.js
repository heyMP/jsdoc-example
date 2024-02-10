/// <reference path="./types.ts" />

/**
 * @type { User }
 */
const user = {
  name: 'heymp',
  email: 'j8ZE99qAzQrjKs6Bg6*xrA@test.com',
  created: new Date().toISOString(),
  active: false
}

/**
 * @type { HTMLTemplateElement | null }
 */
const userTemplate = document.querySelector('template#user-template');
const userRender = document.querySelectorAll('.user-render');

function render() {
  if (userTemplate) {
    if (userRender.length < 1) return;
    const template = userTemplate.content;
    const node = template.cloneNode(true)

    if (!node.textContent) return;

    const tokens = node.textContent?.matchAll(/\[.*\]/g);
    for (const [token] of [...tokens ?? []]) {
      const key = token.replace('[', '').replace(']', '');
      if (key in user) {
        const value = user[/** @type{keyof User} */(key)]
        node.textContent = node.textContent.replace(token, `${value}`);
      }
    }

    [...userRender].forEach(target => {
      if (target.textContent === node.textContent) return
      target.innerHTML = '' 
      target.appendChild(node)
    })
  }
}

render();
