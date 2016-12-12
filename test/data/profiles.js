module.exports = {
  'full': {
    //Belongs to same dojo
    'champion1': ['name', 'badges', 'email', 'dojos'],
    'child1': ['name', 'nick', 'badges', 'parents', 'dojos'],
    'child2': ['name', 'nick', 'badges', 'parents', 'email', 'dojos'],
    'parent1': ['name', 'children', 'badges', 'email', 'dojos'],
    'mentor1': ['name', 'children', 'badges', 'email', 'dojos'],
    //Out of dojo
    // 'manager1': ['name', 'badges', 'email', 'dojos'],
  },
  'limited': {
    'champion1': ['name', 'badges', 'email'],
    'child1': ['name', 'nick', 'badges', 'parents'],
    'child2': ['name', 'nick', 'badges', 'parents'],
    'parent1': ['name', 'children', 'badges'],
    'mentor1': ['name', 'children', 'badges'],

    // 'manager1': ['name', 'badges', 'email', 'dojos']
  },
  'limited2': {
    'champion1': ['name', 'badges', 'email'],
    'child1': ['name', 'nick', 'badges', 'parents'],
    'child2': ['name', 'nick', 'badges', 'parents', 'email'],
    'parent1': ['name', 'children', 'badges', 'email'],
    'mentor1': ['name', 'children', 'badges', 'email'],

    // 'manager1': ['name', 'badges', 'email', 'dojos']
  },
  'limited3': {
    'champion1': ['name', 'badges', 'email'],
    'child1': ['name', 'nick', 'badges', 'parents'],
    'child2': ['name', 'nick', 'badges', 'parents', 'email'],
    'parent1': ['name', 'children', 'badges', 'email', 'dojos'],
    'mentor1': ['name', 'badges'],

    // 'manager1': ['name','badges', 'email', 'dojos']
  },
  'kidLimited': {
    'champion1': ['name', 'badges'],
    'child1': ['name', 'nick', 'badges', 'parents'],
    'child2': ['name', 'nick', 'badges', 'parents'],
    'parent1': ['name', 'badges', 'children'],

    // 'manager1': ['name', 'badges', 'email', 'dojos']
  },
  'restricted': {
    'champion1': ['name', 'badges'],
    'child1': [],
    'child2': [],
    'parent1': [],

    // 'manager1': ['name', 'badges', 'email', 'dojos']
  }
};
