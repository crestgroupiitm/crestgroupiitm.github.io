/* ── Gallery Data ────────────────────────────────────────────────────── */
const B = 'Assests/images/Events and occasions/';
const G = 'Assests/images/Group over the years/';

const galleryItems = [

  /* ── Conferences & Seminars ── */
  {
    id:'c01', category:'conferences',
    title:"ICERSC'26: Opening Session",
    description:"International Conference on Energy and Resource Recovery for Sustainable Circular Economy, hosted at IIT Madras.",
    location:'IIT Madras, Chennai', date:'April 2026',
    imageUrl: B + "International Conference on Energy and Resource Recovery for Sustainable Circular Economy(ICERSC_26) - Apr 2026.JPG"
  },
  {
    id:'c02', category:'conferences',
    title:"ICERSC'26: Delegates &amp; Participants",
    description:"International researchers and industry delegates gathered for the inaugural circular-economy conference.",
    location:'IIT Madras, Chennai', date:'April 2026',
    imageUrl: B + "International Conference on Energy and Resource Recovery for Sustainable Circular Economy (ICERSC_26) - Apr 2026 -2.JPG"
  },
  {
    id:'c03', category:'conferences',
    title:'PYROASIA-2025',
    description:'CREST members at PYROASIA-2025, the premier international pyrolysis conference in Southeast Asia.',
    location:'Pattaya, Thailand', date:'December 2025',
    imageUrl: B + 'PYROASIA-2025 (Pattaya, Bangkok, Dec 2025).jpeg'
  },
  {
    id:'c04', category:'conferences',
    title:'Invited Talk by Dr. Abhishek Singhal',
    description:'Dr. Abhishek Singhal delivered an invited seminar on advanced thermochemical conversion at CREST.',
    location:'IIT Madras, Chennai', date:'December 2025',
    imageUrl: B + 'Invited talk by Dr. Abhishek Singhal (Dec 2025).jpg'
  },
  {
    id:'c05', category:'conferences',
    title:'Invited Talk by Dr. Greg Martin',
    description:'Dr. Greg Martin shared his research on sustainable bio-resource valorisation with the CREST group.',
    location:'IIT Madras, Chennai', date:'December 2025',
    imageUrl: B + 'Invited talk by Dr. Greg Martin (Dec 2025).jpg'
  },
  {
    id:'c06', category:'conferences',
    title:'India Energy Week 2025',
    description:"Prof. Vinu Ravikrishnan representing IIT Madras at India's flagship energy policy and technology summit.",
    location:'New Delhi', date:'January 2025',
    imageUrl: B + 'India Energy Week (New Delhi, Jan. 2025).jpeg'
  },
  {
    id:'c07', category:'conferences',
    title:'Project Review Meeting at IISc Bengaluru',
    description:'Annual project progress review with funding agency representatives and external reviewers at IISc.',
    location:'IISc Bengaluru', date:'April 2025',
    imageUrl: B + 'Project Review Meeting (IISc Bengaluru, April 2025).jpeg'
  },
  {
    id:'c08', category:'conferences',
    title:'PYROASIA-2024 at IIT Guwahati',
    description:'Presenting cutting-edge pyrolysis and waste valorisation research at PYROASIA-2024.',
    location:'IIT Guwahati', date:'November 2024',
    imageUrl: B + 'PYROASIA-2024 (IIT Guwahati, Nov. 2024).jpeg'
  },
  {
    id:'c09', category:'conferences',
    title:'Seminar Panel in Bali, Indonesia',
    description:'Panel discussion on sustainable thermochemical conversion pathways at an international energy seminar.',
    location:'Bali, Indonesia', date:'May 2024',
    imageUrl: B + 'Seminar Panel Discussion in Bali, Indonesia (May 2024).jpeg'
  },
  {
    id:'c10', category:'conferences',
    title:'IGCS Workshop on Circular Economy',
    description:'Indo-German Centre for Sustainability workshop on municipal solid waste treatment and circular economy strategies.',
    location:'IITM Research Park, Chennai', date:'March 2024',
    imageUrl: B + 'IGCS Workshop on MSW Treatment and Circular Economy, IITM Research Park (Mar. 2024).jpeg'
  },
  {
    id:'c11', category:'conferences',
    title:'IGCS Circular Economy Workshop II',
    description:'Participants and speakers at the IGCS workshop covering lifecycle assessment and waste-to-energy pathways.',
    location:'IITM Research Park, Chennai', date:'March 2024',
    imageUrl: B + 'IGCS Workshop on MSW Treatment and Circular Economy, IITM Research Park (Mar. 2024)_2.jpeg'
  },
  {
    id:'c12', category:'conferences',
    title:'Indo-Japan Workshop FAAPEE-2024',
    description:'Bilateral workshop on feedstocks, analytics, and advanced processes in energy engineering at IIT Madras.',
    location:'IIT Madras, Chennai', date:'February 2024',
    imageUrl: B + 'Indo-Japan Workshop FAAPEE-2024 (IIT Madras, Feb. 2024).JPG'
  },
  {
    id:'c13', category:'conferences',
    title:'FAAPEE-2024: Session II',
    description:'Japanese and Indian researchers exchanging insights during the joint thermochemical research workshop.',
    location:'IIT Madras, Chennai', date:'February 2024',
    imageUrl: B + 'Indo-Japan Workshop FAAPEE-2024 (IIT Madras, Feb. 2024) (2).JPG'
  },
  {
    id:'c14', category:'conferences',
    title:'FAAPEE-2024: Session III',
    description:'Technical session presentations covering pyrolysis kinetics and bio-oil characterisation methodologies.',
    location:'IIT Madras, Chennai', date:'February 2024',
    imageUrl: B + 'Indo-Japan Workshop FAAPEE-2024 (IIT Madras, Feb. 2024) (3).JPG'
  },
  {
    id:'c15', category:'conferences',
    title:'FAAPEE-2024: Closing Session',
    description:'Closing ceremony of the Indo-Japan bilateral workshop with exchange of future collaboration plans.',
    location:'IIT Madras, Chennai', date:'February 2024',
    imageUrl: B + 'Indo-Japan Workshop FAAPEE-2024 (IIT Madras, Feb. 2024) (4).jpg'
  },
  {
    id:'c16', category:'conferences',
    title:'National Microplastics Workshop',
    description:'National-level workshop on microplastics detection, treatment, and policy, co-organised by CREST Laboratory.',
    location:'IITM Research Park, Chennai', date:'March 2024',
    imageUrl: B + 'National Microplastics Workshop (Mar. 2024, IITM Research Park).JPG'
  },
  {
    id:'c17', category:'conferences',
    title:'Microplastics Workshop II',
    description:'Multidisciplinary researchers and policymakers engaging on India\'s microplastics challenge.',
    location:'IITM Research Park, Chennai', date:'March 2024',
    imageUrl: B + 'National Microplastics Workshop (Mar. 2024, IITM Research Park) (2).JPG'
  },
  {
    id:'c18', category:'conferences',
    title:'PYROASIA-2023, Kuala Lumpur',
    description:'CREST delegation at PYROASIA-2023 presenting advances in biomass fast pyrolysis and co-pyrolysis kinetics.',
    location:'Kuala Lumpur, Malaysia', date:'June 2023',
    imageUrl: B + 'PYROASIA-2023 (Kualalumpur, Malaysia, June 2023).JPG'
  },
  {
    id:'c19', category:'conferences',
    title:'PYROASIA-2023: Technical Sessions',
    description:'Technical sessions featuring oral presentations on waste plastics pyrolysis and distributed activation energy models.',
    location:'Kuala Lumpur, Malaysia', date:'June 2023',
    imageUrl: B + 'PYROASIA-2023 (Kualalumpur, Malaysia, June 2023) (2).JPG'
  },
  {
    id:'c20', category:'conferences',
    title:'PYROASIA-2023: Group Photo',
    description:'International pyrolysis community delegates at the PYROASIA-2023 conference banquet.',
    location:'Kuala Lumpur, Malaysia', date:'June 2023',
    imageUrl: B + 'PYROASIA-2023 (Kualalumpur, Malaysia, June 2023) (3).JPG'
  },
  {
    id:'c21', category:'conferences',
    title:'Intl. Symposium on Feedstock Recycling',
    description:'Presenting polymer feedstock recycling research at the International Symposium on Feedstock Recycling of Polymers.',
    location:'Sendai, Japan', date:'November 2023',
    imageUrl: B + 'International Symposium on Feedstock Recycling of Polymers-2023 (Sendai, Japan, Nov. 2023).jpeg'
  },
  {
    id:'c22', category:'conferences',
    title:'PYROASIA-2019 at IITM Research Park',
    description:'PYROASIA-2019, hosted at IITM Research Park, brought together the global pyrolysis research community.',
    location:'IITM Research Park, Chennai', date:'December 2019',
    imageUrl: B + 'PYROASIA-2019 (Dec. 2019 , IITM Research Park).JPG'
  },
  {
    id:'c23', category:'conferences',
    title:'PYROASIA-2019: Book of Abstracts Release',
    description:'Release of the book of abstracts marking the formal opening of PYROASIA-2019 at IIT Madras.',
    location:'IITM Research Park, Chennai', date:'December 2019',
    imageUrl: B + 'PYROASIA-2019 (Release of book of Abstract, Dec. 2019, IITM Research Park).JPG'
  },
  {
    id:'c24', category:'conferences',
    title:'PYROASIA-2019: Mahabalipuram Excursion',
    description:'Conference delegates at the cultural excursion to the UNESCO World Heritage site at Mahabalipuram.',
    location:'Mahabalipuram, Tamil Nadu', date:'December 2019',
    imageUrl: B + 'PYROASIA-2019 (Mahabalipuram trip, Dec. 2019).JPG'
  },
  {
    id:'c25', category:'conferences',
    title:'PYROASIA-2019: Mahabalipuram II',
    description:'International attendees of PYROASIA-2019 exploring the historic shore temples of Mahabalipuram.',
    location:'Mahabalipuram, Tamil Nadu', date:'December 2019',
    imageUrl: B + 'PYROASIA-2019 (Mahabalipuram trip, Dec. 2019) (2).JPG'
  },
  {
    id:'c26', category:'conferences',
    title:'GIAN Course with Prof. Eliseo Ranzi',
    description:'GIAN short course on combustion and pyrolysis kinetics delivered by Prof. Eliseo Ranzi, Politecnico di Milano.',
    location:'IIT Madras, Chennai', date:'June 2018',
    imageUrl: B + 'GIAN Course (with Prof. Eliseo Ranzi, Politecnico Milano, June 2018).jpg'
  },
  {
    id:'c27', category:'conferences',
    title:'TCBIOMASS 2018 Short Term Course',
    description:'Participants of the biomass thermochemical conversion short-term course organised at IIT Madras.',
    location:'IIT Madras, Chennai', date:'February 2018',
    imageUrl: B + 'TCBIOMASS 2018 Short Term Course (with course participants, Feb. 2018).jpg'
  },

  /* ── Lab & Visits ── */
  {
    id:'e01', category:'engagements',
    title:'SWMS Bio-gas Plant Visit',
    description:'Site visit to a bio-gas plant for studying solid waste management systems and anaerobic digestion at scale.',
    location:'Chennai', date:'February 2026',
    imageUrl: B + 'SWMS bio-gas plant visit (Feb 2026).jpg'
  },
  {
    id:'e02', category:'engagements',
    title:'Stakeholder Workshop on LCA',
    description:'Life Cycle Assessment stakeholder workshop bringing together industry and academia on bio-energy sustainability metrics.',
    location:'IIT Madras, Chennai', date:'February 2026',
    imageUrl: B + 'Stakeholder Workshop on LCA (Feb 2026).JPG'
  },
  {
    id:'e03', category:'engagements',
    title:'University of Hull Visit',
    description:'Research visit and collaborative discussions with the sustainable energy group at the University of Hull, UK.',
    location:'Hull, United Kingdom', date:'November 2025',
    imageUrl: B + 'University of Hull (Nov. 2025).JPG'
  },
  {
    id:'e04', category:'engagements',
    title:'With Abo Akademi Collaborators',
    description:'Joint research meeting with the combustion and materials group at Åbo Akademi University, Turku.',
    location:'Turku, Finland', date:'June 2024',
    imageUrl: B + 'With Abo Akademi Collaborators in Turku (June 2024).jpeg'
  },
  {
    id:'e05', category:'engagements',
    title:'Research Visit to Åbo Akademi',
    description:'Collaborative research stay at Åbo Akademi, advancing biomass co-pyrolysis and high-pressure kinetics work.',
    location:'Turku, Finland', date:'June 2024',
    imageUrl: B + 'With Meheretu Dirbeba in Abo Akademi, Turku (Jun. 2024).jpeg'
  },
  {
    id:'e06', category:'engagements',
    title:'Meeting with Dr. Vartika Shukla, CMD-EIL',
    description:'Strategic discussion on biorefinery scale-up and industry-academia collaboration with Dr. Vartika Shukla, CMD of EIL.',
    location:'India', date:'July 2024',
    imageUrl: B + 'With Dr. Vartika Shukla, CMD, EIL (July 2024).jpeg'
  },
  {
    id:'e07', category:'engagements',
    title:'CZC Winning Student Team at IIT Madras',
    description:'Celebrating CREST-mentored students who won the Carbon Zero Challenge at IIT Madras.',
    location:'IIT Madras, Chennai', date:'October 2024',
    imageUrl: B + 'With CZC Winning Student Team (IIT Madras, Oct. 2024).jpeg'
  },
  {
    id:'e08', category:'engagements',
    title:'TPI Visit, Avadi',
    description:'Industrial visit to TPI, Avadi with Dr. Vis discussing fuel characterisation and testing protocols.',
    location:'Avadi, Chennai', date:'December 2024',
    imageUrl: B + 'With Bunker-Guru Dr. Vis in TPI, Avadi (Dec. 2024).jpeg'
  },
  {
    id:'e09', category:'engagements',
    title:'Somaiya Vidyavihar University',
    description:"Invited seminar and departmental visit at Somaiya Vidyavihar University's Chemical Engineering programme.",
    location:'Mumbai', date:'October 2024',
    imageUrl: B + 'Somaiya Vidyavihar University, Mumbai (Oct. 2024).jpeg'
  },
  {
    id:'e10', category:'engagements',
    title:'SCSVMV Library Visit',
    description:'Knowledge-sharing visit to Sri Chandrasekarendra Saraswathi Viswa Maha Vidyalaya University Library.',
    location:'Kanchipuram', date:'January 2025',
    imageUrl: B + 'SriChandrasekarendra Saraswathi Viswa Maha Vidyalaya Library (Jan. 2025).jpeg'
  },
  {
    id:'e11', category:'engagements',
    title:'IITM Solid Waste Incineration Facility',
    description:'Inauguration of the IIT Madras solid waste incineration facility, a landmark in campus sustainability.',
    location:'IIT Madras, Chennai', date:'September 2023',
    imageUrl: B + 'Inauguration of IITM Solid Waste Incineration Facility (Sep. 2023).jpeg'
  },
  {
    id:'e12', category:'engagements',
    title:'BHEL Solid Waste Plant, Trichy',
    description:'Inauguration of the solid waste combustion plant at BHEL, Trichy, a flagship industry-research outcome.',
    location:'BHEL, Trichy', date:'May 2022',
    imageUrl: B + 'Inauguration of Solid Waste Combustion Plant, BHEL, Trichy (May 2022).jpg'
  },
  {
    id:'e13', category:'engagements',
    title:'Kodungaiyur Bio-mining Site Visit',
    description:'Field visit to the Kodungaiyur solid waste bio-mining site to study legacy waste treatment practices.',
    location:'Kodungaiyur, Chennai', date:'Site Visit',
    imageUrl: B + 'Kodungaiyur bio-mining site visit.jpg'
  },
  {
    id:'e14', category:'engagements',
    title:'Hannover Waste Management Visit',
    description:'Study visit to waste-to-energy and recycling facilities in Hannover during a European research tour.',
    location:'Hannover, Germany', date:'July 2023',
    imageUrl: B + 'Visit to Waste Management Facilities, Hannover (July 2023).jpeg'
  },
  {
    id:'e15', category:'engagements',
    title:'Research Stay in Turku, Finland',
    description:'Extended research collaboration with the Turku team on biomass thermochemical conversion kinetics.',
    location:'Turku, Finland', date:'September 2023',
    imageUrl: B + 'With Mahendra, Turku, Finland (Sep. 2023).jpg'
  },
  {
    id:'e16', category:'engagements',
    title:'Collaboration in Sendai, Japan',
    description:'Research exchange with Prof. Kaustubha Mohanty at Tohoku University, Sendai, on pyrolysis and gasification.',
    location:'Sendai, Japan', date:'November 2023',
    imageUrl: B + 'With Prof. Kaustubha Mohanty in Sendai, Japan (Nov. 2023).jpeg'
  },
  {
    id:'e17', category:'engagements',
    title:'Aarhus University, Denmark',
    description:'Collaboration meeting with Prof. Patrick Biller at Aarhus University on hydrothermal liquefaction research.',
    location:'Aarhus, Denmark', date:'September 2023',
    imageUrl: B + 'With Prof. Patrick Biller, Aarhus University, Denmark (Sep. 2023).jpeg'
  },
  {
    id:'e18', category:'engagements',
    title:'SEID Collaboration in Stavanger, Norway',
    description:'Meeting with Terje Hauan at SEID in Stavanger to discuss North Sea energy transition R&D partnerships.',
    location:'Stavanger, Norway', date:'September 2023',
    imageUrl: B + 'With Terje Hauan (SEID) in Stavanger, Norway (Sep. 2023).jpeg'
  },
  {
    id:'e19', category:'engagements',
    title:'WWW Conference, New Delhi',
    description:'Participation at the WWW Conference with Dr. Abhishek Sharma, exploring waste, water and energy nexus.',
    location:'New Delhi', date:'August 2023',
    imageUrl: B + 'With Dr. Abhishek Sharma (WWW Conference, New Delhi, Aug. 2023).jpeg'
  },
  {
    id:'e20', category:'engagements',
    title:'Meeting with Distinguished Professors',
    description:'Academic meet with Profs. K. Seshan, Selvam and RangaRao for discussions on catalysis and reaction engineering.',
    location:'IIT Madras, Chennai', date:'January 2024',
    imageUrl: B + 'With Profs. K. Seshan, Selvam, RangaRao (Jan. 2024).jpeg'
  },

  /* ── Outings & Dinners ── */
  {
    id:'o01', category:'outings',
    title:'Dinner at Vasantha Bhavan',
    description:'A celebratory lab dinner at the iconic Vasantha Bhavan to mark milestones and welcome new members.',
    location:'Chennai', date:'July 2025',
    imageUrl: B + 'A dinner at Vasantha Bhavan (July 2025).jpg'
  },
  {
    id:'o02', category:'outings',
    title:'Start-up Group Dinner',
    description:'Informal gathering celebrating entrepreneurial milestones and collaborative spin-off ideas from the lab.',
    location:'Chennai', date:'2025',
    imageUrl: B + 'Start-up group dinner (2025).jpeg'
  },
  {
    id:'o03', category:'outings',
    title:'Dinner with Prof. Dirk Weichgrebe',
    description:'Dinner with visiting collaborator Prof. Dirk Weichgrebe from Leibniz University Hannover.',
    location:'Chennai', date:'March 2024',
    imageUrl: B + 'Dinner with Prof. Dirk Weichgrebe (Mar. 2024).jpeg'
  },
  {
    id:'o04', category:'outings',
    title:'Lab Group Dinner with PI',
    description:'Annual group dinner hosted by Prof. Vinu Ravikrishnan to celebrate the lab family.',
    location:'Chennai', date:'Annual Tradition',
    imageUrl: B + 'Group dinner with PI.jpg'
  },
  {
    id:'o05', category:'outings',
    title:'Lab Group Photograph, April 2023',
    description:'A rare all-hands group photograph capturing the CREST family in the spring of 2023.',
    location:'IIT Madras, Chennai', date:'April 2023',
    imageUrl: B + 'Group clicks (Apr 2023).jpg'
  },
  {
    id:'o06', category:'outings',
    title:'Group Snapshots, April 2023',
    description:'Candid moments from an informal lab gathering between project milestones.',
    location:'IIT Madras, Chennai', date:'April 2023',
    imageUrl: B + 'Random group clicks (Apr 2023).jpg'
  },
  {
    id:'o07', category:'outings',
    title:'Group Snapshots, July 2023',
    description:'Refreshing mid-year get-together bringing the entire CREST group together outside the lab.',
    location:'IIT Madras, Chennai', date:'July 2023',
    imageUrl: B + 'Random group clicks (July 2023).jpg'
  },

  /* ── Group Photos ── */
  {
    id:'g01', category:'group',
    title:'CREST Lab Group, 2025',
    description:'The CREST Laboratory family in 2025: researchers, project staff, and visiting scholars.',
    location:'IIT Madras, Chennai', date:'2025',
    imageUrl: G + '2025/1762137574844.jpg'
  },
  {
    id:'g02', category:'group',
    title:'CREST Lab Group, November 2025',
    description:'End-of-semester group photograph capturing the current cohort of doctoral and master\'s researchers.',
    location:'IIT Madras, Chennai', date:'November 2025',
    imageUrl: G + '2025/IMG-20251103-WA0007.jpg'
  },
  {
    id:'g03', category:'group',
    title:'CREST Lab Group, December 2021',
    description:'Group photograph marking the end of a productive year despite global research disruptions.',
    location:'IIT Madras, Chennai', date:'December 2021',
    imageUrl: G + 'Dec. 2021/IMG_20211205_133109.jpg'
  },
  {
    id:'g04', category:'group',
    title:'CREST Lab Group, December 2021 II',
    description:'Relaxed group moment from the December 2021 year-end gathering on the IIT Madras campus.',
    location:'IIT Madras, Chennai', date:'December 2021',
    imageUrl: G + 'Dec. 2021/IMG_20211205_133150.jpg'
  },
  {
    id:'g05', category:'group',
    title:'CREST Lab Group, December 2021 III',
    description:'Smiles and camaraderie at the CREST year-end celebration, December 2021.',
    location:'IIT Madras, Chennai', date:'December 2021',
    imageUrl: G + 'Dec. 2021/IMG_20211205_133742.jpg'
  },
  {
    id:'g06', category:'group',
    title:'Group Dinner, June 2019',
    description:'The CREST lab at the annual group dinner, celebrating completions and welcoming new researchers.',
    location:'IIT Madras, Chennai', date:'June 2019',
    imageUrl: G + 'Group Dinner_24June2019/IMG_4793.JPG'
  },
  {
    id:'g07', category:'group',
    title:'Group Dinner, June 2019 II',
    description:'Laughter and conversations at the June 2019 CREST group dinner event.',
    location:'IIT Madras, Chennai', date:'June 2019',
    imageUrl: G + 'Group Dinner_24June2019/IMG_4797.JPG'
  },
  {
    id:'g08', category:'group',
    title:'CREST Lab Group, July 2019',
    description:'Mid-year group snapshot capturing the vibrant 2019 cohort of CREST researchers.',
    location:'IIT Madras, Chennai', date:'July 2019',
    imageUrl: G + 'July_2019/IMG_20190723_170030.jpg'
  },
  {
    id:'g09', category:'group',
    title:'CREST Lab Group, January 2017',
    description:'A snapshot of the CREST group in its early years, the foundation of a thriving research culture.',
    location:'IIT Madras, Chennai', date:'January 2017',
    imageUrl: G + 'Jan_2017/IMG_4723.JPG'
  },
  {
    id:'g10', category:'group',
    title:'CREST Lab Group, August 2018',
    description:'The 2018 CREST cohort, a growing team of researchers pushing the frontiers of thermochemical science.',
    location:'IIT Madras, Chennai', date:'August 2018',
    imageUrl: G + 'Aug_2018/IMG_1591.JPG'
  },
  {
    id:'g11', category:'group',
    title:'CREST Lab Group, August 2015',
    description:"The earliest group photograph of the CREST Laboratory, where it all began at IIT Madras.",
    location:'IIT Madras, Chennai', date:'August 2015',
    imageUrl: G + 'Aug_2015/DSC02314.JPG'
  }

];

let currentFilter = 'all';

const CATEGORY_LABELS = {
  outings:     'Outing',
  conferences: 'Conference',
  engagements: 'Lab &amp; Visit',
  group:       'Group Photo'
};

/* ── Render: masonry wall.
   `gallery-card` / `gallery-card-img` / `gallery-card-title` are kept on the markup
   purely as lightbox.js binding hooks (it reads the caption from .gallery-card-title);
   the `.gal-*` classes carry the styling. ── */
function renderGallery() {
  const grid  = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');
  const items = currentFilter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === currentFilter);

  if (items.length === 0) {
    grid.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = items.map(item => `
    <figure class="gal-item gallery-card" data-id="${item.id}" data-category="${item.category}">
      <div class="gal-item-img gallery-card-img">
        <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
      </div>
      <figcaption class="gal-cap">
        <span class="gal-cap-tag">${CATEGORY_LABELS[item.category]}</span>
        <span class="gal-cap-title gallery-card-title">${item.title}</span>
        <span class="gal-cap-meta">${item.location} &middot; ${item.date}</span>
      </figcaption>
    </figure>
  `).join('');

  /* Re-scan so the lightbox binds the freshly rendered (and filtered) set */
  if (window.initLightbox) window.initLightbox();
}

/* ── Counts, computed from the data array ── */
function paintCounts() {
  document.querySelectorAll('.gal-filters .team-filter').forEach(btn => {
    const f = btn.getAttribute('data-gfilter');
    const n = f === 'all'
      ? galleryItems.length
      : galleryItems.filter(i => i.category === f).length;
    btn.querySelector('.gal-filter-count').textContent = n;
  });
  document.getElementById('gal-photo-count').textContent = galleryItems.length;
  document.getElementById('gal-cat-count').textContent =
    new Set(galleryItems.map(i => i.category)).size;
}

/* ── Filter pills ── */
document.querySelectorAll('.gal-filters .team-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gal-filters .team-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-gfilter');
    renderGallery();
  });
});

/* ── Initial render ── */
paintCounts();
renderGallery();
