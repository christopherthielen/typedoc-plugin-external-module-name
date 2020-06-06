const semver = require('semver');
const typedocVersion = require('typedoc/package.json').version;
const isVersion = (semverRange) => semver.satisfies(typedocVersion, semverRange);

const ROOT = '/custom/';

describe('custom: via .typedoc-plugin-external-module-name.js', () => {
  const tsdKindModuleSelector = isVersion('> 0.17.0') ? 'li.tsd-kind-module' : 'li.tsd-kind-external-module';

  it('loads', () => {
    cy.visit('');
  });

  it('renders dIr1 external', () => {
    cy.visit(ROOT);
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get(`${tsdKindModuleSelector}.tsd-is-external`).contains('dIr1');
  });

  it('renders dIr2 external', () => {
    cy.visit(ROOT);
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get(`${tsdKindModuleSelector}.tsd-is-external`).contains('dIr2');
  });

  it('renders rOoT external', () => {
    cy.visit(ROOT);
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get(`${tsdKindModuleSelector}.tsd-is-external`).contains('rOoT');
  });

  it('renders File1 and File2 in rOoT', () => {
    cy.visit(ROOT);

    let ul = cy.get('nav.tsd-navigation.primary ul').get('li a').contains('rOoT').click();

    if (isVersion('< 0.17.0')) {
      cy.contains('External module rOoT');
    } else {
      cy.contains('Module rOoT');
    }

    cy.get('ul.tsd-index-list').get('a').contains('File1');
    cy.get('ul.tsd-index-list').get('a').contains('File2');
  });

  it('renders File1 doc comment', () => {
    cy.visit(ROOT);

    cy.get('a').contains('rOoT').click();
    cy.get('a').contains('File1').click();

    cy.contains('File1 class in the root module');
  });

  it('does not render empty comment blocks where @module used to be', () => {
    cy.visit(ROOT);

    cy.get('a').contains('dIr1').click();
    cy.get('section.tsd-comment').should('not.exist');
  });

  it('automatically creates a module name based on the enclosing directory', () => {
    cy.visit(ROOT);

    cy.get('a').contains('dIr3').click();
    cy.get('ul.tsd-index-list').get('a').contains('Thing1');
    cy.get('ul.tsd-index-list').get('a').contains('Thing2');
  });

  it('only renders the renamed modules, and none of the original names like "dIr1/index"', () => {
    cy.visit(ROOT);
    const expectedModules = ['dIr1', 'dIr2', 'rOoT', 'dIr3/NeSt'];
    cy.get('.tsd-navigation').find(tsdKindModuleSelector).should('have.length', expectedModules.length);
    expectedModules.forEach((expectedModule) => {
      cy.get('.tsd-navigation').find(tsdKindModuleSelector).contains(expectedModule);
    });
  });

  it('renders Nest1 in dIr1', () => {
    cy.visit(ROOT);

    let ul = cy.get('nav.tsd-navigation.primary ul').get('li a').contains('dIr1').click();

    if (isVersion('< 0.17.0')) {
      cy.contains('External module dIr1');
    } else {
      cy.contains('Module dIr1');
    }

    cy.get('ul.tsd-index-list').get('a').contains('Nest1');
  });

  it('renders Nest2 in dIr2', () => {
    cy.visit(ROOT);

    let ul = cy.get('nav.tsd-navigation.primary ul').get('li a').contains('dIr2').click();

    if (isVersion('< 0.17.0')) {
      cy.contains('External module dIr2');
    } else {
      cy.contains('Module dIr2');
    }

    cy.get('ul.tsd-index-list').get('a').contains('Nest2');
  });

  it('renders link to dIr1 re-exported symbol', () => {
    cy.get('a').contains('rOoT').click();
    cy.get('.tsd-member-group .tsd-signature a').contains('dIr1');
  });
});
