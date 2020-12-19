const semver = require('semver');
const typedocVersion = require('typedoc/package.json').version;
const isVersion = (semverRange) => semver.satisfies(typedocVersion, semverRange);

const ROOT = '/automatic-nofiles/';

// Tests that tsconfig.json can use `include:` instead of `files:`
// Not sure why when using `include:` the docs are not rendered as "tsd-is-external"
describe('tsconfig.json with include: instead of files:', () => {
  const tsdKindModuleSelector = isVersion('> 0.17.0') ? 'li.tsd-kind-module' : 'li.tsd-kind-external-module';

  it('loads', () => {
    cy.visit('');
  });

  it('renders dir1', () => {
    cy.visit(ROOT);
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get(`${tsdKindModuleSelector}`).contains('dir1');
  });

  it('renders dir2', () => {
    cy.visit(ROOT);
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get(`${tsdKindModuleSelector}`).contains('dir2');
  });

  it('renders root', () => {
    cy.visit(ROOT);
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get(`${tsdKindModuleSelector}`).contains('root');
  });

  it('renders File1 and File2 in root', () => {
    cy.visit(ROOT);

    let ul = cy.get('nav.tsd-navigation.primary ul').get('li a').contains('root').click();

    if (isVersion('< 0.17.0')) {
      cy.contains('External module root');
    } else {
      cy.contains('Module root');
    }

    cy.get('ul.tsd-index-list').get('a').contains('File1');
    cy.get('ul.tsd-index-list').get('a').contains('File2');
  });

  it('renders File1 doc comment', () => {
    cy.visit(ROOT);

    cy.get('a').contains('root').click();
    cy.get('a').contains('File1').click();

    cy.contains('File1 class in the root module');
  });

  it('does not render empty comment blocks where @module used to be', () => {
    cy.visit(ROOT);

    cy.get('a').contains('dir1').click();
    cy.get('section.tsd-comment').should('not.exist');
  });

  it('only renders the renamed modules, and none of the original names like "dir1/index"', () => {
    cy.visit(ROOT);
    const expectedModules = ['dir1', 'dir2', 'root', 'dir3/nest'];
    cy.get('.tsd-navigation').find(tsdKindModuleSelector).should('have.length', expectedModules.length);
    expectedModules.forEach((expectedModule) => {
      cy.get('.tsd-navigation').find(tsdKindModuleSelector).contains(expectedModule);
    });
  });

  it('renders Nest1 in dir1', () => {
    cy.visit(ROOT);

    let ul = cy.get('nav.tsd-navigation.primary ul').get('li a').contains('dir1').click();

    if (isVersion('< 0.17.0')) {
      cy.contains('External module dir1');
    } else {
      cy.contains('Module dir1');
    }

    cy.get('ul.tsd-index-list').get('a').contains('Nest1');
  });

  it('renders Nest2 in dir2', () => {
    cy.visit(ROOT);

    let ul = cy.get('nav.tsd-navigation.primary ul').get('li a').contains('dir2').click();

    if (isVersion('< 0.17.0')) {
      cy.contains('External module dir2');
    } else {
      cy.contains('Module dir2');
    }

    cy.get('ul.tsd-index-list').get('a').contains('Nest2');
  });

  it('renders link to dir1 re-exported symbol', () => {
    cy.get('a').contains('root').click();
    cy.get('.tsd-member-group .tsd-signature a').contains('dir1');
  });
});
