/* PATENT STATUS FILTER: same pattern as the team.html cohort filter */
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('[data-patent-filter]');
  const rows = document.querySelectorAll('.pat-row');
  const empty = document.getElementById('pat-empty');
  if (!buttons.length || !rows.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-patent-filter');

      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      let visible = 0;
      rows.forEach(row => {
        const show = filter === 'all' || row.getAttribute('data-patent-status') === filter;
        row.classList.toggle('pat-row-hidden', !show);
        if (show) visible++;
      });

      if (empty) empty.hidden = visible > 0;
    });
  });
});
