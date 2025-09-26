//hitung switch tab
function switchLabTab(tab) {
	document.querySelectorAll('.kalkulator-tab').forEach(btn => btn.classList.remove('active'));
	document.querySelectorAll('.kalkulator-panel').forEach(panel => panel.classList.remove('active'));
	document.getElementById(tab + '-tab').classList.add('active');
	document.getElementById(tab + '-panel').classList.add('active');
}

// hitung integral
function hitungIntegral() {
	const fx = document.getElementById('integral-fx').value;
	const a = parseFloat(document.getElementById('integral-a').value);
	const b = parseFloat(document.getElementById('integral-b').value);
	let result = '';
	try {
		if (window.math) {
			const f = x => math.evaluate(fx, {x});
			const N = 1000;
			const dx = (b - a) / N;
			let sum = 0;
			for (let i = 0; i < N; i++) {
				const x = a + i * dx + dx/2;
				sum += f(x) * dx;
			}
			result = `∫<sub>${a}</sub><sup>${b}</sup> ${fx} dx ≈ <b>${sum.toFixed(6)}</b>`;
		} else {
			result = 'math.js tidak tersedia.';
		}
	} catch (e) {
		result = 'Format fungsi salah atau batas tidak valid.';
	}
	document.getElementById('integral-result').innerHTML = result;
}

// hitung aplikasi integral
function hitungAplikasiIntegral() {
	const fx = document.getElementById('aplikasi-fx').value;
	const a = parseFloat(document.getElementById('aplikasi-a').value);
	const b = parseFloat(document.getElementById('aplikasi-b').value);
	const tipe = document.getElementById('aplikasi-tipe').value;
	let result = '';
	try {
		if (window.math) {
			const N = 1000;
			const dx = (b - a) / N;
			let sum = 0;
			if (tipe === 'luas') {
				const f = x => math.evaluate(fx, {x});
				for (let i = 0; i < N; i++) {
					const x = a + i * dx + dx/2;
					sum += f(x) * dx;
				}
				result = `Luas di bawah kurva f(x) dari ${a} ke ${b} ≈ <b>${sum.toFixed(6)}</b>`;
			} else if (tipe === 'volume') {
				const f = x => math.evaluate(fx, {x});
				for (let i = 0; i < N; i++) {
					const x = a + i * dx + dx/2;
					sum += Math.PI * Math.pow(f(x), 2) * dx;
				}
				result = `Volume benda putar (sumbu x) dari ${a} ke ${b} ≈ <b>${sum.toFixed(6)}</b>`;
			}
		} else {
			result = 'math.js tidak tersedia.';
		}
	} catch (e) {
		result = 'Format fungsi salah atau batas tidak valid.';
	}
	document.getElementById('aplikasi-result').innerHTML = result;
}

window.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.kalkulator-tab').forEach(btn => {
		btn.addEventListener('click', function() {
			switchLabTab(this.dataset.tab);
		});
	});
	switchLabTab('integral');
});
