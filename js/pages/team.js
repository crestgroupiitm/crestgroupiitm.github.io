/* COHORT FILTER: current members. Scoped to .team-filters so it does not also
   capture the alumni pill row further down the page. */
document.querySelectorAll('.team-filters .team-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.team-filters .team-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.tm-group').forEach(group => {
      group.style.display = (filter === 'all' || group.getAttribute('data-role-group') === filter) ? '' : 'none';
    });
  });
});

/* COHORT FILTER: alumni directory, independent of the roster filter above */
document.querySelectorAll('.alum-filters .team-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.alum-filters .team-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-alum-filter');
    document.querySelectorAll('.alum-group').forEach(group => {
      group.style.display = (filter === 'all' || group.getAttribute('data-alum-group') === filter) ? '' : 'none';
    });
  });
});
