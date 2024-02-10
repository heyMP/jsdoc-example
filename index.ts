type UserT = {
  name: string,
  email: `${string|number}@${string|number}.${string}`,
  /** Date.prototype.toISOString */
  created: ReturnType<typeof Date.prototype.toISOString>,
  active: boolean
}


const user: UserT = {
  name: 'heymp',
  email: 'j8ZE99qAzQrjKs6Bg6*xrA@test.com',
  created: new Date().toISOString(),
  active: false
}

const userTemplate: HTMLTemplateElement | null = document.querySelector('template#user-template');
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
        const value = user[(key as keyof User)];
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
