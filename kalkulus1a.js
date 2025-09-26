function switchLabTab(tab) {
  document.querySelectorAll('.kalkulator-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.kalkulator-panel').forEach(panel => panel.classList.remove('active'));
  document.getElementById(tab + '-tab').classList.add('active');
  document.getElementById(tab + '-panel').classList.add('active');
}

function hitungLimit() {
  const fx = document.getElementById('limit-fx').value;
  const x0 = parseFloat(document.getElementById('limit-x0').value);
  let result = '';
  try {
    if (window.math) {
      const expr = fx.replace(/\^/g, '**');
      const lim = math.evaluate(expr, {x: x0});
      result = `limₓ→${x0} ${fx} = <b>${lim}</b>`;
    } else {
      const expr = fx.replace(/\^/g, '**').replace(/x/g, `(${x0})`);
      const lim = eval(expr);
      result = `limₓ→${x0} ${fx} = <b>${lim}</b>`;
    }
  } catch (e) {
    result = 'Format fungsi salah atau x₀ tidak valid.';
  }
  document.getElementById('limit-result').innerHTML = result;
}

function hitungTurunan() {
  const fx = document.getElementById('diff-fx').value;
  const x0 = parseFloat(document.getElementById('diff-x0').value);
  let result = '';
  try {
    if (window.math) {
      const diff = math.derivative(fx, 'x').toString();
      const val = math.derivative(fx, 'x').evaluate({x: x0});
      result = `f'(x) = <span class="math-preview">${diff}</span><br>f'(${x0}) = <b>${val}</b>`;
    } else {
      const h = 1e-5;
      const expr = fx.replace(/\^/g, '**');
      const f1 = eval(expr.replace(/x/g, `(${x0}+${h})`));
      const f0 = eval(expr.replace(/x/g, `(${x0})`));
      const val = (f1 - f0) / h;
      result = `Pendekatan f'(${x0}) ≈ <b>${val.toFixed(5)}</b>`;
    }
  } catch (e) {
    result = 'Format fungsi salah atau x₀ tidak valid.';
  }
  document.getElementById('diff-result').innerHTML = result;
}

function aplikasiTurunan() {
  const fx = document.getElementById('aplikasi-fx').value;
  let result = '';
  try {
    if (window.math) {
      const d1 = math.derivative(fx, 'x');
      const d2 = math.derivative(d1, 'x');
      let stasioner = [];
      for (let x = -20; x <= 20; x += 0.01) {
        const val = d1.evaluate({x});
        if (Math.abs(val) < 1e-3) stasioner.push(Number(x.toFixed(2)));
      }
      stasioner = [...new Set(stasioner.map(v => v.toFixed(2)))];
      if (stasioner.length === 0) {
        result = 'Tidak ditemukan titik stasioner di x ∈ [-20, 20]';
      } else {
        result = '<b>Titik stasioner:</b><br>';
        stasioner.forEach(x => {
          const d2val = d2.evaluate({x: Number(x)});
          let jenis = d2val > 0 ? 'Minimum lokal' : (d2val < 0 ? 'Maksimum lokal' : 'Sadle/Infleksi');
          result += `x = ${x}, f''(${x}) = ${d2val.toFixed(2)} → <b>${jenis}</b><br>`;
        });
      }
    } else {
      result = 'math.js tidak tersedia, aplikasi turunan hanya support dengan math.js.';
    }
  } catch (e) {
    result = 'Format fungsi salah.';
  }
  document.getElementById('aplikasi-result').innerHTML = result;
}
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.kalkulator-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      switchLabTab(this.dataset.tab);
    });
  });
  switchLabTab('limit');
});
