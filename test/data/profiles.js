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
    'champion1': ['name', 'email', 'dojos'],
    'child1': ['name', 'nick', 'parents', 'dojos'],
    'child2': ['name', 'nick', 'parents', 'email', 'dojos'],
    'child2-1': ['name', 'nick', 'parents', 'email', 'dojos'],
    'parent1': ['name', 'children', 'email', 'dojos'],
    'mentor1': ['name', 'email', 'dojos'],
    // Public profiles but they are also part of the dojo
    'parent3': ['name', 'children', 'email', 'dojos'],
    'child3-1': ['name', 'nick', 'email', 'dojos'],
    'mentor3': ['name', 'email', 'dojos'],
    //  Out of dojo
    'randomParent1': ['name', 'email'],
    // Other Dojo
    'child3': ['name', 'nick', 'dojos', 'parents', 'email'],
    'parent2': ['name', 'children', 'dojos', 'email']
  },

  // Anyone having right inside a dojo (ticketingA/DojoA(/champ))
  'full': {
    //  Belongs to same dojo
    'champion1': ['name', 'email', 'dojos'],
    'child1': ['name', 'nick', 'parents', 'dojos'],
    'child2': ['name', 'nick', 'parents', 'email', 'dojos'],
    'child2-1': ['name', 'nick', 'parents', 'email', 'dojos'],
    'parent1': ['name', 'children', 'email', 'dojos'],
    'mentor1': ['name', 'email', 'dojos'],
    // Public profiles but they are also part of the dojo
    'parent3': ['name', 'children', 'email', 'dojos'],
    'child3-1': ['name', 'nick', 'email', 'dojos'],
    'mentor3': ['name', 'email', 'dojos'],
    //  Out of dojo
    'randomParent1': [],
    // Other Dojo
    'child3': [],
    'parent2': []
  },

  // Should see info from its dojo org member
  'limited': {
    //  Belongs to same dojo
    'champion1': ['name', 'dojos'],
    'child2-1': [],
    'child1': [],
    'child2': [],
    'parent1': [],
    'mentor1': ['name', 'children'],
    // Public profiles
    'parent3': ['name', 'children', 'dojos'],
    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'dojos'],

    //  Out of dojo
    'randomParent1': [],
    // Other Dojo
    'child3': [],
    'parent2': []
  },

  // Should see basic info from its dojo org member as well as its family
  'limitedFamily': {
    // Belongs to same dojo
    'champion1': ['name', 'dojos'],
    'child1': ['name', 'nick', 'parents', 'dojos'],
    'child2': ['name', 'nick', 'parents', 'dojos', 'email'],
    'child2-1': ['name', 'nick', 'parents', 'dojos', 'email'],
    'parent1': ['name', 'children', 'email', 'dojos'],
    'mentor1': [],
    // Public profiles
    'parent3': ['name', 'children', 'dojos'],
    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'dojos'],

    //  Out of dojo
    'randomParent1': [],
    // Other Dojo
    'child3': [],
    'parent2': []
  },

  'outsider': {
    // Out of Dojo
    'champion1': [],
    'child1': [],
    'child2': [],
    'child2-1': [],
    'parent1': [],
    'mentor1': [],
    'child3': [],
    'parent2': [],

    // Public profiles
    'parent3': ['name', 'children', 'dojos'],
    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'dojos'],
  },
  // Should see its own dojo members but not others dojo 's members
  'otherDojo': {
    // Belongs to Dojo
    'champion2': ['name', 'email', 'dojos'],
    'parent2': ['name', 'children', 'email', 'dojos'],
    'child3': ['name', 'nick', 'parents', 'email', 'dojos'],
    'mentor2': ['name', 'email'], // unapproved but still available
    'parent1': ['name', 'children', 'email', 'dojos'],
    'child1': ['name', 'parents', 'dojos'],
    'child2': ['name', 'parents', 'email', 'dojos'],
    // Public profiles
    'parent3': ['name', 'children', 'dojos'],
    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'dojos'],

    // Other Dojo
    'champion1': ['name', 'email', 'dojos'], // unapproved but still available
    'mentorAdmin1': [],
    'mentorTicketing1': [],
    'mentorFullAccess1': [],
    'parentAdmin1': [],
    'parentTicketing1': [],
    'parentFullAccess1': [],
    'mentor1': []
  },
  'otherDojoLimitedFamily': {
    // Belongs to Dojo
    'champion2': ['name', 'dojos'],
    'parent2': ['name', 'children', 'email', 'dojos'],
    'child3': ['name', 'nick', 'parents', 'email', 'dojos'],
    'mentor2': [],
    'parent1': [],
    'child1': [],
    'child2': [],
    // Public profiles
    'parent3': ['name', 'children', 'dojos'],
    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'dojos'],

    // Other Dojo
    'champion1': [],
    'mentorAdmin1': [],
    'mentorTicketing1': [],
    'mentorFullAccess1': [],
    'parentAdmin1': [],
    'parentTicketing1': [],
    'parentFullAccess1': [],
    'mentor1': []
  }
};
