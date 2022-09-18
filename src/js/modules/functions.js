export function isWebp() {
  // Проверка поддержки webp
  function testWebp(callback) {
    const webP = new Image()
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2)
    }
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp(function (support) {
    const className = support === true ? 'webp' : 'no-webp'
    document.documentElement.classList.add(className)
  })
}

export function setSkillsRate() {
  const skillsLine = document.querySelectorAll('.skills__line--top')

  skillsLine.forEach((skill) => {
    const rate = skill.dataset.length

    setTimeout(() => {
      skill.style.width = `${rate}%`
    }, 500)
  })
}

export function setLang() {
  const langWrapper = document.querySelector('.lang-group')
  const links = document.querySelectorAll('.lang-group__link')

  langWrapper.addEventListener('click', (e) => {
    const target = e.target
    
    if (target && target.closest('.lang-group__link')) {
      location.href = target.getAttribute('href')
      fetchLanguages()
      
      if (location.hash === target.getAttribute('href')) {
        links.forEach((link) => link.classList.remove('active'))
        target.classList.add('active')
      }
    }
  })
}

export function changeURLLang() {
  const allLang = ['en', 'ru', 'uk']
  const hash = location.hash
  const value = hash.slice(1)
  
  if (allLang.includes(value)) {
    document.querySelector(`a[href="${hash}"]`).classList.add('active')
  } else {
    location.href = `${location.pathname}#en`
    document.querySelector(`a[href="#en"]`).classList.add('active')
    location.reload()
  }
}

export async function fetchLanguages() {
  const title = document.querySelector('title')
  const hash = location.hash
  const value = hash.slice(1)

  try {
    const local = 'files/data.json'
    const gitHub = 'https://starkelessar.github.io/my-resume/files/data.json'
    const url = process.env.NODE_ENV === 'development' ? local : gitHub

    const response = await fetch(url)
    const { languages } = await response.json()

    title.innerText = languages['title'][value]
    for (let key in languages) {
      const elements = document.querySelectorAll(`[data-lang="${key}"]`)

      if (elements) {
        elements.forEach((element) => {
          element.innerText = languages[key][value]
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
