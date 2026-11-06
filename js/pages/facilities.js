/* CAPABILITY-GROUP FILTER: same pattern as the team.html cohort filter */
document.querySelectorAll('.team-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.team-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.fac-group').forEach(group => {
      group.style.display = (filter === 'all' || group.getAttribute('data-fac-group') === filter) ? '' : 'none';
    });
  });
});
