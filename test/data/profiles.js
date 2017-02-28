module.exports = {
  // Reminder : dojo1: { // THIS IS TEMPORARY, refer to cd-dojo-service/tests/fixt/dojo-members (children depends from parents)
  //  champ1, parent1, child1, child2, mentor1, child2-1 (champ)
  //  parent3(public), child3-1(public), mentor3
  // },
  // dojo2: {
  //  champ2, parent1, parent2, child3, champ1 (unapproved), mentor2(unapproved), parent1, child1, child2
  // }

  // Anyone having right inside a dojo (ticketingA/DojoA(/champ))
  'cdf': {
    //  Belongs to same dojo
    'champion one': ['name', 'email', 'dojos'],
    'child1 of parent1': ['name', 'nick', 'parents', 'dojos'],
    'child2 of parent1': ['name', 'nick', 'parents', 'email', 'dojos'],
    'child2-1 of parent1': ['name', 'nick', 'parents', 'email', 'dojos'],
    'parent one': ['name', 'children', 'email', 'dojos'],
    'mentor one': ['name', 'email', 'dojos'],
    // Public profiles but they are also part of the dojo
    'parent three': ['name', 'children', 'email', 'dojos'],
    'child3-1 of parent3': ['name', 'nick', 'email', 'dojos'],
    'mentor three': ['name', 'email', 'dojos'],
    //  Out of dojo
    'randomParent one': ['name', 'email'],
    // Other Dojo
    'child3 of parent2': ['name', 'nick', 'dojos', 'parents', 'email'],
    'parent two': ['name', 'children', 'dojos', 'email']
  },

  // Anyone having right inside a dojo (ticketingA/DojoA(/champ))
  'full': {
    //  Belongs to same dojo
    'champion one': ['name', 'email', 'dojos'],
    'child1 of parent1': ['name', 'nick', 'parents', 'dojos'],
    'child2 of parent1': ['name', 'nick', 'parents', 'email', 'dojos'],
    'child2-1 of parent1': ['name', 'nick', 'parents', 'email', 'dojos'],
    'parent one': ['name', 'children', 'email', 'dojos'],
    'mentor one': ['name', 'email', 'dojos'],
    // Public profiles but they are also part of the dojo
    'parent three': ['name', 'children', 'email', 'dojos'],
    'child3-1 of parent3': ['name', 'nick', 'email', 'dojos'],
    'mentor three': ['name', 'email', 'dojos'],
    //  Out of dojo
    'randomParent one': [],
    // Other Dojo
    'child3 of parent2': [],
    'parent two': []
  },

  // Should see info from its dojo org member
  'limited': {
    //  Belongs to same dojo
    'champion one': ['name', 'dojos'],
    'child2-1 of parent1': [],
    'child1 of parent1': [],
    'child2 of parent1': [],
    'parent one': [],
    'mentor one': ['name', 'children'],
    // Public profiles
    'parent three': ['name', 'children', 'dojos'],
    'child3-1 of parent3': ['nick', 'dojos'],
    'mentor three': ['name', 'dojos'],

    //  Out of dojo
    'randomParent one': [],
    // Other Dojo
    'child3 of parent2': [],
    'parent two': []
  },

  // Should see basic info from its dojo org member as well as its family
  'limitedFamily': {
    // Belongs to same dojo
    'champion one': ['name', 'dojos'],
    'child1 of parent1': ['name', 'nick', 'parents', 'dojos'],
    'child2 of parent1': ['name', 'nick', 'parents', 'dojos', 'email'],
    'child2-1 of parent1': ['name', 'nick', 'parents', 'dojos', 'email'],
    'parent one': ['name', 'children', 'email', 'dojos'],
    'mentor one': [],
    // Public profiles
    'parent three': ['name', 'children', 'dojos'],
    'child3-1 of parent3': ['nick', 'dojos'],
    'mentor three': ['name', 'dojos'],

    //  Out of dojo
    'randomParent one': [],
    // Other Dojo
    'child3 of parent2': [],
    'parent two': []
  },

  'outsider': {
    // Out of Dojo
    'champion one': [],
    'child1 of parent1': [],
    'child2 of parent1': [],
    'child2-1 of parent1': [],
    'parent one': [],
    'mentor one': [],
    'child3 of parent2': [],
    'parent two': [],

    // Public profiles
    'parent three': ['name', 'children', 'dojos'],
    'child3-1 of parent3': ['nick', 'dojos'],
    'mentor three': ['name', 'dojos']
  },
  // Should see its own dojo members but not others dojo 's members
  'otherDojo': {
    // Belongs to Dojo
    'champion two': ['name', 'email', 'dojos'],
    'parent two': ['name', 'children', 'email', 'dojos'],
    'child3 of parent2': ['name', 'nick', 'parents', 'email', 'dojos'],
    'mentor two': ['name', 'email'], // unapproved but still available
    'parent one': ['name', 'children', 'email', 'dojos'],
    'child1 of parent1': ['name', 'parents', 'dojos'],
    'child2 of parent1': ['name', 'parents', 'email', 'dojos'],
    // Public profiles
    'parent three': ['name', 'children', 'dojos'],
    'child3-1 of parent3': ['nick', 'dojos'],
    'mentor three': ['name', 'dojos'],

    // Other Dojo
    'champion one': ['name', 'email', 'dojos'], // unapproved but still available
    'mentorAdmin one': [],
    'mentorTicketing one': [],
    'mentorFullAccess one': [],
    'parentAdmin one': [],
    'parentTicketing one': [],
    'parentFullAccess one': [],
    'mentor one': []
  },
  'otherDojoLimitedFamily': {
    // Belongs to Dojo
    'champion two': ['name', 'dojos'],
    'parent two': ['name', 'children', 'email', 'dojos'],
    'child3 of parent2': ['name', 'nick', 'parents', 'email', 'dojos'],
    'mentor two': [],
    'parent one': [],
    'child1 of parent1': [],
    'child2 of parent1': [],
    // Public profiles
    'parent three': ['name', 'children', 'dojos'],
    'child3-1 of parent3': ['nick', 'dojos'],
    'mentor three': ['name', 'dojos'],

    // Other Dojo
    'champion one': [],
    'mentorAdmin one': [],
    'mentorTicketing one': [],
    'mentorFullAccess one': [],
    'parentAdmin one': [],
    'parentTicketing one': [],
    'parentFullAccess one': [],
    'mentor one': []
  }
};
