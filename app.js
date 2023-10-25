const sectionWrapperElement1 = document.querySelector('.section-wrapper1')
const wrapperElements1 =
  sectionWrapperElement1.querySelectorAll('.section-item')
const sectionWrapperElement2 = document.querySelector('.section-wrapper2')
const wrapperElements2 =
  sectionWrapperElement2.querySelectorAll('.section-item')

for (const task of wrapperElements1) {
  task.draggable = 'true'
}

sectionWrapperElement1.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`)
})

sectionWrapperElement1.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`)
})

sectionWrapperElement1.addEventListener(`dragover`, (evt) => {
  // Разрешаем сбрасывать элементы в эту область
  evt.preventDefault()

  // Находим перемещаемый элемент
  const activeElement = sectionWrapperElement1.querySelector(`.selected`)
  // Находим элемент, над которым в данный момент находится курсор
  const currentElement = evt.target
  // Проверяем, что событие сработало:
  // 1. не на том элементе, который мы перемещаем,
  // 2. именно на элементе списка
  const isMoveable =
    activeElement !== currentElement &&
    currentElement.classList.contains(`section-item`)

  // Если нет, прерываем выполнение функции
  if (!isMoveable) {
    return
  }

  // Находим элемент, перед которым будем вставлять
  const nextElement =
    currentElement === activeElement.nextElement //Sibling
      ? currentElement.nextElementSibling
      : currentElement

  // Вставляем activeElement перед nextElement
  sectionWrapperElement1.insertBefore(activeElement, nextElement)
})

for (const task of wrapperElements2) {
  task.draggable = 'true'
}

sectionWrapperElement2.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`)
})

sectionWrapperElement2.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`)
})

sectionWrapperElement2.addEventListener(`dragover`, (evt) => {
  // Разрешаем сбрасывать элементы в эту область
  evt.preventDefault()

  // Находим перемещаемый элемент
  const activeElement = sectionWrapperElement2.querySelector(`.selected`)
  // Находим элемент, над которым в данный момент находится курсор
  const currentElement = evt.target
  // Проверяем, что событие сработало:
  // 1. не на том элементе, который мы перемещаем,
  // 2. именно на элементе списка
  const isMoveable =
    activeElement !== currentElement &&
    currentElement.classList.contains(`section-item`)

  // Если нет, прерываем выполнение функции
  if (!isMoveable) {
    return
  }

  // Находим элемент, перед которым будем вставлять
  const nextElement =
    currentElement === activeElement.nextElement //Sibling
      ? currentElement.nextElement // Sibling
      : currentElement

  // Вставляем activeElement перед nextElement
  sectionWrapperElement2.insertBefore(activeElement, nextElement)
})

// =======================================================================================

const draggables = document.querySelectorAll('.section-item')
const containers = document.querySelectorAll('.section')

draggables.forEach((drag) => {
  drag.addEventListener('dragstart', () => {
    drag.classList.add('selected')
  })

  drag.addEventListener('dragend', () => {
    drag.classList.remove('selected')
  })
})

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault()
    const dragging = document.querySelector('.selected')
    const dropTarget = getDropPosition(container, e.clientY)
    if (dropTarget) {
      container.insertBefore(dragging, dropTarget)
    } else {
      container.appendChild(dragging)
    }
  })
})

function getDropPosition(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.section-item:not(.selected'),
  ]

  for (const drag of draggableElements) {
    const pos = drag.getBoundingClientRect()
    if (y < pos.bottom) {
      return drag
    }
  }
  return null
}
