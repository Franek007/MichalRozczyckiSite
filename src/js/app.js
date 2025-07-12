import './common.js'

const page = document.body.dataset.page
console.log(page)

if (page === 'landingPage') {
	import('./landingPage.js')
}
