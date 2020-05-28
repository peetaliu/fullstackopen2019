// Cypress tests use Mocha under the hood. As per Mocha docs,
// avoid using arrow functions as they may cause issues in certain circumstances

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Peter Liu',
      username: 'peetaliu',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it.only('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('peetaliu')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  })
  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2020'
    )
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('peetaliu')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
    cy.contains('Peter Liu logged in')
    cy.contains('new note').click()
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('peetaliu')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Peter Liu logged in')
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made important', function () {
        cy.contains('another note cypress').contains('make important').click()

        cy.contains('another note cypress').contains('make not important')
      })
    })
  })
})
