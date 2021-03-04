import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/all';
import initCanvas from './js/background';

const paths = document.querySelectorAll('path');
const rect = document.querySelectorAll('rect');

paths.forEach((path) => {
	const l = path.getTotalLength();
	gsap.set(path, {
		strokeDasharray: l,
		strokeDashoffset: l,
		autoRound: false,
	});
});
rect.forEach((path) => {
	const l = path.getTotalLength();
	gsap.set(path, {
		strokeDasharray: l,
		strokeDashoffset: l,
		autoRound: false,
	});
});

const tl = gsap.timeline();
tl.delay(2);
tl.set('.intro-container__cover', { display: 'none' });
tl.staggerTo('#logo rect', 1, { strokeDashoffset: 0 });
tl.staggerTo('#logo path', 2, { strokeDashoffset: 0 }, 0.05);
tl.staggerTo('#logo-text path', 1.5, { strokeDashoffset: 0 }, 0.2, '-=1');
tl.staggerTo(paths, 1, { strokeDashoffset: '100%', autoAlpha: 0 }, 0.1, '+=1');
tl.to(rect, { strokeDashoffset: '50%', autoAlpha: 0, duration: 1 }, '-=1');
tl.to('.intro-container__left', {
	x: '-100%',
	duration: 0.9,
	ease: 'expo.out',
});
tl.to(
	'.intro-container__right',
	{ x: '100%', duration: 0.9, ease: 'expo.out' },
	'-=0.9'
);
tl.set('.intro-container', { display: 'none' });
tl.to('.txt', { opacity: 1, duration: 0.3 });
initCanvas();
