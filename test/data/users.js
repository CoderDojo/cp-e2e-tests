module.exports = {
  manager1: {
    email: 'manager1@example.com',
    password: 'Manager1@Zen', // Must be in this format, it's a cdf account and hence more restricted
    name: 'manager one'
  },
  champion1: {
    email: 'champion1@example.com',
    password: 'testchampion1',
    name: 'champion one'
  },
  champion2: {
    email: 'champion2@example.com',
    password: 'testchampion2',
    name: 'champion two'
  },
  champion3: {
    email: 'champion3@example.com',
    password: 'testchampion3',
    name: 'champion three'
  },
  champion4: {
    email: 'champion4@example.com',
    password: 'testchampion4',
    name: 'champion four'
  },
  champion5: {
    email: 'champion5@example.com',
    password: 'testchampion5',
    name: 'champion five'
  },
  champion6: {
    email: 'champion6@example.com',
    password: 'testchampion6',
    name: 'champion six'
  },
  parent1: {
    email: 'parent1@example.com',
    password: 'testparent1',
    name: 'parent one',
    children: [
      'child1 of parent1',
      'child2 of parent1',
      'child2-1 of parent1'
    ]
  },
  parent2: {
    email: 'parent2@example.com',
    password: 'testparent2',
    name: 'parent two',
    children: [
      'child3 of parent2'
    ]
  },
  parentTicketing1: {
    email: 'parentTicketing1@example.com',
    password: 'testparentTicketing1',
    name: 'parentTicketing one'
  },
  parentAdmin1: {
    email: 'parentAdmin1@example.com',
    password: 'testparentAdmin1',
    name: 'parentAdmin one'
  },
  parentFullAccess1: {
    email: 'parentFullAccess1@example.com',
    password: 'testparentFullAccess1',
    name: 'parentFullAccess one'
  },
  mentor1: {
    email: 'mentor1@example.com',
    password: 'testmentor1',
    name: 'mentor one'
  },
  mentor2: {
    email: 'mentor2@example.com',
    password: 'testmentor2',
    name: 'mentor two'
  },
  mentorTicketing1: {
    email: 'mentorTicketing1@example.com',
    password: 'testmentorTicketing1',
    name: 'mentorTicketing one'
  },
  mentorAdmin1: {
    email: 'mentorAdmin1@example.com',
    password: 'testmentorAdmin1',
    name: 'mentorAdmin one'
  },
  mentorFullAccess1: {
    email: 'mentorFullAccess1@example.com',
    password: 'testmentorFullAccess1',
    name: 'mentorFullAccess one'
  },
  randomParent1: {
    email: 'randomParent1@example.com',
    password: 'testrandomParent1',
    name: 'randomParent one'
  },
  'child1 of parent1': {
    name: 'child1 of parent1',
    alias: 'nick1'
  },
  'child2 of parent1': {
    name: 'child2 of parent1',
    alias: 'nick2',
    email: 'child2@example.com',
    password: 'testchild2'
  },
  'child2-1 of parent1': {
    name: 'child2-1 of parent1',
    alias: 'nick2-1',
    email: 'child2-1@example.com',
    password: 'testchild2-1'
  }
};
