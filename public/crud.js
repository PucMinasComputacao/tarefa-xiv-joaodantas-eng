const API = 'http://localhost:3000/lugares';

carregarLugares();
document.getElementById('form-lugar').addEventListener('submit', function(e) {
  e.preventDefault();

  const id = document.getElementById('campo-id').value;
  const lugar = {
    nome:      document.getElementById('campo-nome').value,
    pais:      document.getElementById('campo-pais').value,
    descricao: document.getElementById('campo-descricao').value,
    lat:       parseFloat(document.getElementById('campo-lat').value),
    lng:       parseFloat(document.getElementById('campo-lng').value)
  };

  if (id) {
    fetch(API + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lugar)
    })
    .then(() => {
      limparForm();
      carregarLugares();
    });
  } else {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lugar)
    })
    .then(() => {
      limparForm();
      carregarLugares();
    });
  }
});
document.getElementById('btn-cancelar').addEventListener('click', function() {
  limparForm();
});
function carregarLugares() {
  fetch(API)
    .then(res => res.json())
    .then(lugares => {
      const lista = document.getElementById('lista-lugares');
      lista.innerHTML = '';

      if (lugares.length === 0) {
        lista.innerHTML = '<p style="color:#999">Nenhum lugar cadastrado ainda.</p>';
        return;
      }

      lugares.forEach(lugar => {
        const card = document.createElement('div');
        card.className = 'card-lugar';
        card.innerHTML = `
          <div class="card-info">
            <h3>${lugar.nome} — ${lugar.pais}</h3>
            <p>${lugar.descricao}</p>
            <p class="coords">📍 Lat: ${lugar.lat} | Lng: ${lugar.lng}</p>
          </div>
          <div class="card-acoes">
            <button class="btn-editar" onclick="editarLugar(${lugar.id})">Editar</button>
            <button class="btn-excluir" onclick="excluirLugar(${lugar.id})">Excluir</button>
          </div>
        `;
        lista.appendChild(card);
      });
    });
}
function editarLugar(id) {
  fetch(API + '/' + id)
    .then(res => res.json())
    .then(lugar => {
      document.getElementById('campo-id').value        = lugar.id;
      document.getElementById('campo-nome').value      = lugar.nome;
      document.getElementById('campo-pais').value      = lugar.pais;
      document.getElementById('campo-descricao').value = lugar.descricao;
      document.getElementById('campo-lat').value       = lugar.lat;
      document.getElementById('campo-lng').value       = lugar.lng;

      document.getElementById('titulo-form').textContent = 'Editar Lugar';
      document.getElementById('btn-cancelar').style.display = 'inline-block';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
function excluirLugar(id) {
  if (!confirm('Tem certeza que deseja excluir este lugar?')) return;

  fetch(API + '/' + id, { method: 'DELETE' })
    .then(() => carregarLugares());
}
function limparForm() {
  document.getElementById('form-lugar').reset();
  document.getElementById('campo-id').value = '';
  document.getElementById('titulo-form').textContent = 'Adicionar Lugar';
  document.getElementById('btn-cancelar').style.display = 'none';
}