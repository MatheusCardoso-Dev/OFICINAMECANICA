(function(){
  const $ = (s, ctx=document) => ctx.querySelector(s);

  // Year in footer
  const y = new Date().getFullYear();
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(y);

  // Smooth scroll for in-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href') || '';
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
  });

  // Form: set min date to today
  const inputDate = $('#data');
  if (inputDate){
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth()+1).padStart(2,'0');
    const dd = String(today.getDate()).padStart(2,'0');
    inputDate.min = `${yyyy}-${mm}-${dd}`;
  }

  // Form submit -> WhatsApp
  const form = $('#form-agendamento');
  if (form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const nome = $('#nome')?.value.trim();
      const telefone = $('#telefone')?.value.trim();
      const veiculo = $('#veiculo')?.value.trim();
      const servico = $('#servico')?.value;
      const data = $('#data')?.value;
      const hora = $('#hora')?.value;
      const obs = $('#obs')?.value.trim();

      // basic validation
      if (!nome || !telefone || !veiculo || !servico || !data || !hora){
        alert('Preencha todos os campos obrigatórios.');
        return;
      }

      // Format date/time to BR
      const [y, m, d] = data.split('-');
      const dataBR = `${d}/${m}/${y}`;

      const lines = [
        `Olá! Gostaria de agendar uma revisão.`,
        `Nome: ${nome}`,
        `Telefone: ${telefone}`,
        `Veículo: ${veiculo}`,
        `Serviço: ${servico}`,
        `Data/Hora: ${dataBR} às ${hora}`,
        obs ? `Observações: ${obs}` : null,
        `Enviado pelo site.`
      ].filter(Boolean);

      const msg = encodeURIComponent(lines.join('\n'));
      const phone = '5543984336883';
      const url = `https://wa.me/${phone}?text=${msg}`;
      window.open(url, '_blank');
    });
  }
})();