const PAGINATION = '[test-id="pagination"]';
const FIRST_PAGE = '[aria-label="first page"]';
const PREVIOUS_PAGE = '[aria-label="previous page"]';
const NEXT_PAGE = '[aria-label="next page"]';
const LAST_PAGE = '[aria-label="last page"]';
const PAGINATION_INPUT = '[test-id="pagination-input"]';
const PAGE_RANGE = '[test-id="page-range"]';

const PAGE_SIZE_SELECT = '.v-field__field';

describe('Pagination', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('Pagination input contains correct value after clicking icon buttons, and icon buttons are disabled when relevant', () => {
    cy.get(PAGINATION).should('exist');

    // PAGE 1 on mount
    cy.get(FIRST_PAGE).should('be.disabled');
    cy.get(PREVIOUS_PAGE).should('be.disabled');
    cy.get(NEXT_PAGE).should('not.be.disabled');
    cy.get(LAST_PAGE).should('not.be.disabled');

    // clicking next page on page 1
    cy.get(NEXT_PAGE).click();
    cy.get(PAGINATION_INPUT).should('have.value', '2');

    cy.get(FIRST_PAGE).should('not.be.disabled');
    cy.get(PREVIOUS_PAGE).should('not.be.disabled');

    cy.get(LAST_PAGE).should('not.be.disabled');
    cy.get(NEXT_PAGE).should('not.be.disabled');

    // Click to go to LAST PAGE
    cy.get(LAST_PAGE).click();
    cy.get(PAGINATION_INPUT).should('have.value', '3');

    cy.get(FIRST_PAGE).should('not.be.disabled');
    cy.get(PREVIOUS_PAGE).should('not.be.disabled');

    cy.get(LAST_PAGE).should('be.disabled');
    cy.get(NEXT_PAGE).should('be.disabled');

    // CLICK to go to Previous Page when on last page
    cy.get(PREVIOUS_PAGE).click();

    cy.get(PAGINATION_INPUT).should('have.value', '2');

    cy.get(FIRST_PAGE).should('not.be.disabled');
    cy.get(PREVIOUS_PAGE).should('not.be.disabled');

    cy.get(LAST_PAGE).should('not.be.disabled');
    cy.get(NEXT_PAGE).should('not.be.disabled');

    // CLICK to go to First Page
    cy.get(FIRST_PAGE).click();
    cy.get(PAGINATION_INPUT).should('have.value', '1');

    cy.get(FIRST_PAGE).should('be.disabled');
    cy.get(PREVIOUS_PAGE).should('be.disabled');
    cy.get(NEXT_PAGE).should('not.be.disabled');
    cy.get(LAST_PAGE).should('not.be.disabled');
  });

  it('should display correct page ranges', () => {
    cy.get(PAGINATION).should('exist');

    // PAGE 1
    cy.get(FIRST_PAGE).should('be.disabled');
    cy.get(PAGE_RANGE).should('contain.text', '1 - 25 of 75');

    // Page 2
    cy.get(NEXT_PAGE).click();
    cy.get(PAGE_RANGE).should('contain.text', '26 - 50 of 75');

    // Page 3
    cy.get(LAST_PAGE).click();
    cy.get(PAGE_RANGE).should('contain.text', '51 - 75 of 75');

    // Page 2
    cy.get(PREVIOUS_PAGE).click();
    cy.get(PAGE_RANGE).should('contain.text', '26 - 50 of 75');

    // Page 1
    cy.get(FIRST_PAGE).click();
    cy.get(PAGE_RANGE).should('contain.text', '1 - 25 of 75');
  });

  it('displays correct page ranges when using using input to type page followed by blur', () => {
    cy.get(PAGINATION).should('exist');

    cy.get(PAGINATION_INPUT).clear().type('2').blur();
    cy.get(PAGE_RANGE).should('contain.text', '26 - 50 of 75');

    cy.get(PAGINATION_INPUT).clear().type('1').blur();
    cy.get(PAGE_RANGE).should('contain.text', '1 - 25 of 75');

    cy.get(PAGINATION_INPUT).clear().type('3').blur();
    cy.get(PAGE_RANGE).should('contain.text', '51 - 75 of 75');

    cy.get(PAGINATION_INPUT).clear().type('1').blur();
    cy.get(PAGE_RANGE).should('contain.text', '1 - 25 of 75');

    cy.get(PAGINATION_INPUT).clear().type('10').blur();
    cy.get(PAGE_RANGE).should('contain.text', '51 - 75 of 75');

    cy.get(PAGINATION_INPUT).clear().type('1').blur();
    cy.get(PAGE_RANGE).should('contain.text', '1 - 25 of 75');

    cy.get(PAGINATION_INPUT).clear().type(' ').blur();
    cy.get(PAGE_RANGE).should('contain.text', '1 - 25 of 75');

    cy.get(PAGINATION_INPUT).clear().type('0').blur();
    cy.get(PAGE_RANGE).should('contain.text', '1 - 25 of 75');
  });

  it('input restricts characters to only digits allows empty input', () => {
    cy.get(PAGINATION).should('exist');

    cy.get(PAGINATION_INPUT).clear().type('....').blur();
    cy.get(PAGINATION_INPUT).should('be.empty');

    cy.get(PAGINATION_INPUT).clear().type('abcdefghijklmnopqrstuvwxyz').blur();
    cy.get(PAGINATION_INPUT).should('be.empty');

    cy.get(PAGINATION_INPUT).clear().type('ABCDEFGHIJKLMNOPQRSTUVWXYZ').blur();
    cy.get(PAGINATION_INPUT).should('be.empty');

    cy.get(PAGINATION_INPUT).clear().type(',./ <>? ;: \'" {}[]|').blur();
    cy.get(PAGINATION_INPUT).should('be.empty');

    cy.get(PAGINATION_INPUT).clear().type('\\').blur();
    cy.get(PAGINATION_INPUT).should('be.empty');

    cy.get(PAGINATION_INPUT).clear().type('`~!@#$%^&*()_+ -=').blur();
    cy.get(PAGINATION_INPUT).should('be.empty');
  });

  it.only('should update page to last page if current page exceeds max page after changing numberPerPage in drop-down', () => {
    cy.get(PAGINATION).should('exist');

    cy.get('.footer').find(PAGE_SIZE_SELECT).click();

    cy.get('.v-list')
      .children()
      .eq(0)
      .click();

    cy.get(PAGE_SIZE_SELECT).should('contain.text', 'View 10');

    cy.get(PAGINATION_INPUT).clear().type('8').blur();
    cy.get(PAGINATION_INPUT).should('have.value', '8'); // 1-10 of 75 Page 1 of 8


    cy.get('.footer').find(PAGE_SIZE_SELECT).click();

    cy.get('.v-list')
      .children()
      .eq(3)
      .click();

    cy.get(PAGE_SIZE_SELECT).should('contain.text', 'View 100');

    cy.get(PAGINATION_INPUT).should('have.value', '1'); // Page 1 of 1

    cy.get(PAGE_RANGE).should('contain.text', '1 - 75 of 75');
  });
});