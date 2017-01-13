module.exports = {
  'full': {
    //  Belongs to same dojo
    'champion1': ['name', 'email', 'dojos'],
    'child1': ['name', 'nick', 'parents', 'dojos'],
    'child2': ['name', 'nick', 'parents', 'email', 'dojos'],
    'parent1': ['name', 'children', 'email', 'dojos'],
    'mentor1': ['name', 'children', 'email', 'dojos'],

    //  Out of dojo
    'child3': [],
    'parent2': []
    // 'manager1': ['name', 'email', 'dojos'],
  },
  // Should see info from its dojo org member
  'limited': {
    'champion1': ['name', 'dojos'],
    'child1': [],
    'child2': [],
    'parent1': [],
    'mentor1': ['name', 'children'],
    'parent3': ['name', 'children', 'dojos'],
    // Public profiles
    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'children', 'dojos'],

    'child3': [],
    'parent2': []

    // 'manager1': ['name', 'email', 'dojos']
  },
  // Should see basic info from its dojo org member as well as its family
  'limitedFamily': {
    'champion1': ['name', 'dojos'],
    'child1': ['name', 'nick', 'parents', 'dojos'],
    'child2': ['name', 'nick', 'parents', 'dojos', 'email'],
    'parent1': ['name', 'children', 'email', 'dojos'],
    'mentor1': [],
    'parent3': ['name', 'children', 'dojos'],

    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'children', 'dojos'],

    'child3': [],
    'parent2': []

    // 'manager1': ['name', 'email', 'dojos']
  },
  'none': {
    'champion1': [],
    'child1': [],
    'child2': [],
    'parent1': [],
    'mentor1': [],

    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'children', 'dojos'],

    'child3': [],
    'parent2': []
  },
  // Should see basic info from its dojo org member as well as its family
  // 'kidLimited': {
  //   'champion1': ['name', 'dojos'],
  //   'child1': ['name', 'nick', 'parents', 'dojos'],
  //   'child2': ['name', 'nick', 'parents', 'dojos'],
  //   'parent1': ['name', 'children', 'dojos', 'email'],
  //
  //   'child3': [],
  //   'parent2': []
  //
  //   // 'manager1': ['name', 'email', 'dojos']
  // },
  // Should see its own dojo members but not others dojo 's members
  'otherDojo': {
    'champion1': [],
    'champion2': ['name', 'email', 'dojos'],
    // We don't test child1&2 cause theyr also a part of the dojo

    'parent3': ['name', 'children', 'dojos'],
    'child3-1': ['nick', 'dojos'],
    'mentor3': ['name', 'children', 'dojos'],

    'child3': ['name', 'nick', 'parents', 'email', 'dojos'],
    'parent2': ['name', 'children', 'email', 'dojos'],

    // 'manager1': ['name', 'email', 'dojos']
  },
};
