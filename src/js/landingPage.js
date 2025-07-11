let opinionsCards
let opinionsProgressDots
let opinionsBtnRight
let opinionsBtnLeft
let opinionsBtns

const main2 = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	opinionsCards = document.querySelectorAll('.opinions__card')
	opinionsProgressDots = document.querySelectorAll('.opinions__progress-dot')
	opinionsBtnLeft = document.querySelector('.opinions__btn--left')
	opinionsBtnRight = document.querySelector('.opinions__btn--right')
	opinionsBtns = document.querySelectorAll('.opinions__btn')
}

const prepareDOMEvents = () => {
	opinionsBtns.forEach(btn => {
		if (btn.classList.contains('opinions__btn--left')) {
			btn.addEventListener('click', handleOpinionLeftSlider)
		} else {
			btn.addEventListener('click', handleOpinionRightSlider)
		}
	})
}

const handleOpinionLeftSlider = params => {}

const handleOpinionRightSlider = params => {}

const handleOpinionSlider = () => {
	opinionsCards.forEach(card => {
		if (card.classList.contains('opinions__card--active')) {
			console.log('jej')
			card.style.transfrom = 'translateX(-300px)'
			const activeCard = card.dataset.cardNumber
			let activeDot = Array.from(opinionsProgressDots).find(dot => dot.dataset.cardNumber == activeCard)
			activeDot.classList.add('.opinions__progress-dot--active')
		}
	})
}

document.addEventListener('DOMContentLoaded', main2)
