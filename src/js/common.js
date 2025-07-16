import gsap from 'gsap/dist/gsap'

let burgerBtn
let navBar
let sideBar
let navSideBar
let firstBurgerBar
let navItems
let navHomeIcon
let footerYear
let lastScroll = 0
let currentScroll = 0
let savedCurrentScroll = 0
const page = document.body.dataset.page

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	burgerBtn = document.querySelector('.burgerBtn')
	navBar = document.querySelector('.nav')
	navSideBar = navBar.querySelector('.nav__sidebar')
	firstBurgerBar = navBar.querySelector('.burgerBtn__firstBar')
	navItems = navBar.querySelectorAll('.nav__item')
	navHomeIcon = navBar.querySelector('.nav__home')
	footerYear = document.querySelector('.footer__year')
}

const prepareDOMEvents = () => {
	burgerBtn.addEventListener('click', handleMobileNav)
	navItems.forEach(item => {
		item.addEventListener('click', handleMobileNav)
	})
	navHomeIcon.addEventListener('click', () => {
		if (navSideBar.classList.contains('nav__sidebar--active')) {
			navSideBar.classList.remove('nav__sidebar--active')
		}
	})
	window.addEventListener('scroll', hideNav)
	getTime()
	animations()
	NavActive()
}

const animations = () => {
	gsap.utils.toArray('.section-heading').forEach(el => {
		gsap.from(el, {
			scrollTrigger: {
				trigger: el,
				start: 'top 70%',
				toggleActions: 'play none none none',
			},
			x: 50,
			opacity: 0,
			duration: 1,
			ease: 'power3.out',
		})
	}),
		gsap.utils.toArray('.section-text').forEach(el => {
			if (el.classList.contains('no-aim')) return
			gsap.from(el, {
				scrollTrigger: {
					trigger: el,
					start: 'top 60%',
					toggleActions: 'play none none none',
				},
				x: -50,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
			})
		})
}

const NavActive = () => {
	if (page != 'landingPage') {
		navBar.classList.add('nav--active')
	}
}

const handleMobileNav = () => {
	navSideBar.classList.toggle('nav__sidebar--active')
	burgerBtn.classList.toggle('burgerBtn--active')
	navHomeIcon.classList.toggle('nav__home--active')

	if (navSideBar.classList.contains('nav__sidebar--active')) {
		document.body.style.overflowY = 'hidden'
	} else {
		document.body.style.overflowY = ''
	}

	navItems.forEach(item => {
		item.parentElement.classList.toggle('nav__item--active')
	})
}

const hideNav = () => {
	if (document.querySelector('.nav__sidebar--active')) {
		return
	}

	currentScroll = window.scrollY || document.documentElement.scrollTop

	if (currentScroll > lastScroll) {
		gsap.to(navBar, { y: -navBar.offsetHeight, duration: 0.4, ease: 'power2.out' })
		navBar.classList.remove('nav--active')
	} else {
		gsap.to(navBar, { y: 0, duration: 0.4, ease: 'power2.out' })
		navBar.classList.add('nav--active')
	}

	lastScroll = currentScroll <= 0 ? 0 : currentScroll

	if (lastScroll < 10) {
		if (page != 'landingPage') {
			navBar.classList.add('nav--active')
		} else {
			gsap.to(navBar, { y: 0, duration: 0.4, ease: 'power2.out' })
			navBar.classList.remove('nav--active')
		}
	}
}

const getTime = () => {
	let year = new Date()
	footerYear.textContent = year.getFullYear()
}

document.addEventListener('DOMContentLoaded', main)
