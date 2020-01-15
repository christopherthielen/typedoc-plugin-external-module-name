describe('docs', () => {
  it('loads', () => {
    cy.visit('');
  });

  it('renders dir1 external', () => {
    cy.visit('/');
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get('li.tsd-kind-external-module.tsd-is-external.tsd-is-external').contains('dir1');
  });

  it('renders dir2 external', () => {
    cy.visit('/');
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get('li.tsd-kind-external-module.tsd-is-external.tsd-is-external').contains('dir2');
  });

  it('renders root external', () => {
    cy.visit('/');
    let ul = cy.get('nav.tsd-navigation.primary ul');
    ul.get('li.tsd-kind-external-module.tsd-is-external.tsd-is-external').contains('root');
  });

  it('renders File1 and File2 in root', () => {
    cy.visit('/');

    let ul = cy
      .get('nav.tsd-navigation.primary ul')
      .get('li a')
      .contains('root')
      .click();

    cy.contains('External module root');

    cy.get('ul.tsd-index-list')
      .get('a')
      .contains('File1');

    cy.get('ul.tsd-index-list')
      .get('a')
      .contains('File2');
  });

  it('renders File1 doc comment', () => {
    cy.visit('/');

    cy.get('a')
      .contains('root')
      .click();
    cy.get('a')
      .contains('File1')
      .click();

    cy.contains('This is in the root module');
  });

  it('does not render empty comment blocks where @module used to be', () => {
    cy.visit('/');

    cy.get('a')
      .contains('root')
      .click();
    cy.get('section.tsd-comment').should('not.exist');
  });

  it('renders Nest1 in dir1', () => {
    cy.visit('/');

    let ul = cy
      .get('nav.tsd-navigation.primary ul')
      .get('li a')
      .contains('dir1')
      .click();

    cy.contains('External module dir1');

    cy.get('ul.tsd-index-list')
      .get('a')
      .contains('Nest1');
  });

  it('renders Nest2 in dir2', () => {
    cy.visit('/');

    let ul = cy
      .get('nav.tsd-navigation.primary ul')
      .get('li a')
      .contains('dir2')
      .click();

    cy.contains('External module dir2');

    cy.get('ul.tsd-index-list')
      .get('a')
      .contains('Nest2');
  });

  it('renders link to dir1 re-exported symbol', () => {
    cy.get('a')
      .contains('root')
      .click();
    cy.get('.tsd-member-group .tsd-signature a').contains('dir1');
  });

  it('renders modules renamed to parent.child', () => {
    cy.get('a')
      .contains('parent')
      .click();
    cy.get('a')
      .contains('child')
      .click();
    cy.location().should(loc => {
      expect(loc.pathname).to.contain('modules/parent.child');
    });
    cy.get('a').contains('ParentChild');
  });
});
