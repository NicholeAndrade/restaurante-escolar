// admin.js - interacción ligera
const apiBase = '/api/admin';

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.menu-item');
  const sectionEls = document.querySelectorAll('.section');
  const usersTbody = document.getElementById('users-tbody');
  const refreshBtn = document.getElementById('btn-refresh');
  const searchInput = document.getElementById('search');
  const modal = document.getElementById('edit-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const cancelEdit = document.getElementById('cancel-edit');
  const editForm = document.getElementById('edit-form');

  // navegación
  sections.forEach(btn => btn.addEventListener('click', () => {
    sections.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.section;
    sectionEls.forEach(s => s.classList.toggle('active', s.id === `section-${target}`));
  }));

  // cargar usuarios
  async function loadUsers(q='') {
    usersTbody.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
    try {
      const res = await fetch(`${apiBase}/users?search=${encodeURIComponent(q)}`);
      const json = await res.json();
      if(!res.ok) throw new Error(json.message || 'Error cargando usuarios');
      if(json.users.length === 0){
        usersTbody.innerHTML = '<tr><td colspan="6">No hay usuarios</td></tr>';
        return;
      }
      usersTbody.innerHTML = json.users.map(u => `
        <tr>
          <td>${u.id}</td>
          <td><img class="users-photo" src="${u.photo || '/assets/avatar-placeholder.png'}" alt=""></td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td>
            <button class="btn" data-id="${u.id}" data-action="edit">Editar</button>
            <button class="btn danger" data-id="${u.id}" data-action="delete">Eliminar</button>
          </td>
        </tr>
      `).join('');
    } catch(err){
      usersTbody.innerHTML = `<tr><td colspan="6">Error: ${err.message}</td></tr>`;
    }
  }

  loadUsers();

  refreshBtn.addEventListener('click', () => loadUsers(searchInput.value));
  searchInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') loadUsers(searchInput.value);
  });

  // delegación botones tabla
  usersTbody.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if(!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if(action === 'edit') openEditModal(id);
    if(action === 'delete') {
      if(confirm('Eliminar usuario permanentemente?')) deleteUser(id);
    }
  });

  // abrir modal con datos
  async function openEditModal(id) {
    try {
      const res = await fetch(`${apiBase}/users/${id}`);
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'No se pudo obtener usuario');
      document.getElementById('user-id').value = data.user.id;
      document.getElementById('user-name').value = data.user.name;
      document.getElementById('user-email').value = data.user.email;
      document.getElementById('user-role').value = data.user.role;
      document.getElementById('user-password').value = '';
      modal.classList.remove('hidden');
    } catch(err){
      alert('Error: ' + err.message);
    }
  }

  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
  cancelEdit.addEventListener('click', () => modal.classList.add('hidden'));

  editForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const id = document.getElementById('user-id').value;
    const payload = {
      name: document.getElementById('user-name').value.trim(),
      email: document.getElementById('user-email').value.trim(),
      role: document.getElementById('user-role').value,
      password: document.getElementById('user-password').value
    };
    try {
      const res = await fetch(`${apiBase}/users/${id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if(!res.ok) throw new Error(json.message || 'Error al actualizar');
      modal.classList.add('hidden');
      loadUsers(searchInput.value);
      alert('Usuario actualizado');
    } catch(err){
      alert('Error: ' + err.message);
    }
  });

  // delete
  async function deleteUser(id){
    try {
      const res = await fetch(`${apiBase}/users/${id}`, {method:'DELETE'});
      const json = await res.json();
      if(!res.ok) throw new Error(json.message || 'No se pudo eliminar');
      loadUsers(searchInput.value);
      alert('Usuario eliminado');
    } catch(err){
      alert('Error: ' + err.message);
    }
  }

  // profile photo change (simple upload)
  const photoInput = document.getElementById('photo-input');
  photoInput.addEventListener('change', async () => {
    const file = photoInput.files[0];
    if(!file) return;
    const form = new FormData();
    form.append('photo', file);
    const res = await fetch(`${apiBase}/profile/photo`, {method:'POST', body: form});
    const json = await res.json();
    if(!res.ok) return alert('Error: ' + (json.message || 'No se pudo subir'));
    document.getElementById('admin-photo').querySelector('img').src = json.photo;
  });

  // logout
  document.getElementById('btn-logout').addEventListener('click', async () => {
    await fetch('/api/auth/logout', {method:'POST'});
    window.location.href = '/login.html';
  });

});