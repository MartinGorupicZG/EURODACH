import { gsap } from 'gsap';
const logo = document.querySelector('.logo');
const path = document.querySelectorAll('.logo path');

const mask = document.querySelector('.intro-loader__wrapper__mask');
const img = document.querySelector('.intro-loader__wrapper__img');
const intro = document.querySelector('.intro-loader');
const txt = document.querySelector('.intro-loader__txt');
console.log(mask);

export default function initIntro() {
	const tl = gsap.timeline();
	tl.delay(2);

	tl.to(path, { strokeDashoffset: 0, stagger: 0.2, duration: 1.5 });
	tl.to(logo, {
		duration: 0.4,
		autoAlpha: 0,
		yPercent: -10,
		ease: 'power2.out',
	});
	tl.to(mask, { duration: 0.7, yPercent: -101, ease: 'power2.out' }, '-=0.3');
	tl.to(img, { duration: 0.7, yPercent: -101, ease: 'power2.out' }, '-=0.3');
	tl.to(txt, { autoAlpha: 1, y: -20, duration: 1, ease: 'power2.out' });
	tl.to(txt, {
		autoAlpha: 0,
		duration: 0.5,
		y: -50,
		ease: 'power2.out',
		delay: 4,
	});
	tl.to(img, { duration: 0.7, yPercent: -202, ease: 'power2.out' });
	tl.to(mask, { duration: 0.7, yPercent: -200, ease: 'power2.out' }, '-=0.2');
	tl.to(intro, { duration: 0.7, yPercent: -100, ease: 'power2.out' }, '-=0.1');
}
