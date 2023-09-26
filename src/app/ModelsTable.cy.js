import ModelsTable from './ModelsTable.vue'

describe('<ModelsTable />', () => {
  let mountCount = 0

  beforeEach(() => {
    cy.mount(ModelsTable)
    // Wait until data finish loading before each test
    cy.wait(5000);
    // Count the number of ModelsTable has been mounted,
    // As support for sorting functionality test
    mountCount += 1
  })

  it('contains correct button label, table column label and handles show/hide note column', () => {
    cy.get('[data-cy=showNote]').should('has.text', ' Hide Note ')

    cy.get('.el-table__header-wrapper .el-table__header th').as('tableCols');
    cy.get('@tableCols').should('have.length', 5);
    cy.get('@tableCols').first().should('have.text', 'Organ')
    cy.get('@tableCols').eq(1).should('have.text', 'Species')
    cy.get('@tableCols').eq(2).should('have.text', 'Note')
    cy.get('@tableCols').eq(3).should('have.text', 'Last modified')
    cy.get('@tableCols').eq(4).should('have.text', 'Action')
    
    // Click to trigger show/hide note column
    cy.get('[data-cy=showNote]').click();
    
    cy.get('[data-cy=showNote]').should('have.text', ' Show Note ' )
    cy.get('@tableCols').should('have.length', 4);
    cy.get('[data-cy=noteColumn]').should('not.exist');
  })

  it('contains correct input placeholder and search output', () => {
    cy.get('.el-table__body-wrapper tr.el-table__row').as('tableRows')
    cy.get('[data-cy=searchInput]').should('have.attr', 'placeholder', 'Type to search')
    cy.get('@tableRows').should('have.length', 28);

    // Search on keyword 'heart'
    cy.get('[data-cy=searchInput]').type('heart')

    cy.get('@tableRows').should('have.length', 6);
    cy.get('@tableRows').filter(":contains(Lungs)").should('not.exist')

    // Clear input and dialog change back to default
    cy.get('[data-cy=searchInput]').clear()

    cy.get('[data-cy=searchInput]').should('have.attr', 'placeholder', 'Type to search')
    cy.get('@tableRows').should('have.length', 28);
  })

  it('contains correct content order for organ', () => {
    cy.get(`td.el-table_${mountCount}_column_${(5*(mountCount-1)+1)}`).as('organ')

    // Start with default order
    cy.get('@organ').first().should('have.text', 'Bladder')
    cy.get('@organ').eq(1).should('have.text', 'Colon')
    cy.get('@organ').eq(2).should('have.text', 'Colon')
    cy.get('@organ').eq(-1).should('have.text', 'Cube')
    cy.get('@organ').eq(-2).should('have.text', 'Surfaces')
    cy.get('@organ').eq(-3).should('have.text', 'Points')

    // Click to order organ in ascending order
    cy.contains('Organ').click()

    cy.get('@organ').first().should('have.text', 'Bladder')
    cy.get('@organ').eq(1).should('have.text', 'Bladder')
    cy.get('@organ').eq(2).should('have.text', 'Bladder')
    cy.get('@organ').eq(-1).should('have.text', 'Whole body')
    cy.get('@organ').eq(-2).should('have.text', 'Whole body')
    cy.get('@organ').eq(-3).should('have.text', 'Surfaces')

    // Click to order organ in descending order
    cy.contains('Organ').click()

    cy.get('@organ').first().should('have.text', 'Whole body')
    cy.get('@organ').eq(1).should('have.text', 'Whole body')
    cy.get('@organ').eq(2).should('have.text', 'Surfaces')
    cy.get('@organ').eq(-1).should('have.text', 'Bladder')
    cy.get('@organ').eq(-2).should('have.text', 'Bladder')
    cy.get('@organ').eq(-3).should('have.text', 'Bladder')

    // Click to restore to default order
    cy.contains('Organ').click()
    
    cy.get('@organ').first().should('have.text', 'Bladder')
    cy.get('@organ').eq(1).should('have.text', 'Colon')
    cy.get('@organ').eq(2).should('have.text', 'Colon')
    cy.get('@organ').eq(-1).should('have.text', 'Cube')
    cy.get('@organ').eq(-2).should('have.text', 'Surfaces')
    cy.get('@organ').eq(-3).should('have.text', 'Points')
  })

  it('contains correct content order for species', () => {
    cy.get(`td.el-table_${mountCount}_column_${(5*(mountCount-1)+2)}`).as('species')

    // Start with default order
    cy.get('@species').first().should('have.text', 'Rat')
    cy.get('@species').eq(1).should('have.text', 'Mouse')
    cy.get('@species').eq(2).should('have.text', 'Pig')
    cy.get('@species').eq(-1).should('have.text', '')
    cy.get('@species').eq(-2).should('have.text', '')
    cy.get('@species').eq(-3).should('have.text', '')

    // Click to order species in ascending order
    cy.contains('Species').click()

    cy.get('@species').first().should('have.text', '')
    cy.get('@species').eq(1).should('have.text', '')
    cy.get('@species').eq(2).should('have.text', '')
    cy.get('@species').eq(-1).should('have.text', 'Rat')
    cy.get('@species').eq(-2).should('have.text', 'Rat')
    cy.get('@species').eq(-3).should('have.text', 'Rat')

    // Click to order species in descending order
    cy.contains('Species').click()

    cy.get('@species').first().should('have.text', 'Rat')
    cy.get('@species').eq(1).should('have.text', 'Rat')
    cy.get('@species').eq(2).should('have.text', 'Rat')
    cy.get('@species').eq(-1).should('have.text', '')
    cy.get('@species').eq(-2).should('have.text', '')
    cy.get('@species').eq(-3).should('have.text', '')

    // Click to restore to default order
    cy.contains('Species').click()
    
    cy.get('@species').first().should('have.text', 'Rat')
    cy.get('@species').eq(1).should('have.text', 'Mouse')
    cy.get('@species').eq(2).should('have.text', 'Pig')
    cy.get('@species').eq(-1).should('have.text', '')
    cy.get('@species').eq(-2).should('have.text', '')
    cy.get('@species').eq(-3).should('have.text', '')
  })

  it('contains correct content order for last modified', () => {
    cy.get(`td.el-table_${mountCount}_column_${(5*(mountCount-1)+4)}`).as('lastModified')

    // Start with default order
    cy.get('@lastModified').first().should('have.text', 'Jun 2, 2020 08:55:47')
    cy.get('@lastModified').eq(1).should('have.text', 'Apr 23, 2020')
    cy.get('@lastModified').eq(2).should('have.text', 'May 20, 2021')
    cy.get('@lastModified').eq(-1).should('have.text', '2 Febuary, 2023')
    cy.get('@lastModified').eq(-2).should('have.text', '5 December, 2022')
    cy.get('@lastModified').eq(-3).should('have.text', '5 December, 2022')

    // Click to order last modified in ascending order
    cy.contains('Last modified').click({force: true})

    cy.get('@lastModified').first().should('have.text', 'Feb 27, 2020 20:57:43')
    cy.get('@lastModified').eq(1).should('have.text', 'Apr 2, 2020 15:00:49')
    cy.get('@lastModified').eq(2).should('have.text', 'Apr 23, 2020')
    cy.get('@lastModified').eq(-1).should('have.text', '2 Febuary, 2023')
    cy.get('@lastModified').eq(-2).should('have.text', '5 December, 2022')
    cy.get('@lastModified').eq(-3).should('have.text', '5 December, 2022')

    // Click to order last modified in descending order
    cy.contains('Last modified').click({force: true})

    cy.get('@lastModified').first().should('have.text', '2 Febuary, 2023')
    cy.get('@lastModified').eq(1).should('have.text', '5 December, 2022')
    cy.get('@lastModified').eq(2).should('have.text', '5 December, 2022')
    cy.get('@lastModified').eq(-1).should('have.text', 'Feb 27, 2020 20:57:43')
    cy.get('@lastModified').eq(-2).should('have.text', 'Apr 2, 2020 15:00:49')
    cy.get('@lastModified').eq(-3).should('have.text', 'Apr 23, 2020')

    // Click to restore to default order
    cy.contains('Last modified').click({force: true})

    cy.get('@lastModified').first().should('have.text', 'Jun 2, 2020 08:55:47')
    cy.get('@lastModified').eq(1).should('have.text', 'Apr 23, 2020')
    cy.get('@lastModified').eq(2).should('have.text', 'May 20, 2021')
    cy.get('@lastModified').eq(-1).should('have.text', '2 Febuary, 2023')
    cy.get('@lastModified').eq(-2).should('have.text', '5 December, 2022')
    cy.get('@lastModified').eq(-3).should('have.text', '5 December, 2022')
  })
})