import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { Button } from './Button';

describe('Buttons', () => {
  beforeEach(() => {
    const mockMethod = function (): undefined {
      return undefined;
    };

    CustomMount(
      <div>
        <div>
          <Button data-testid="small-button" onClick={mockMethod}>
            Small
          </Button>
          <Button data-testid="medium-button">
            Medium
          </Button>
          <Button data-testid="large-button">
            Large
          </Button>
        </div>
        <div>
          <Button data-testid="disabled-button" disabled={true}>
            Disabled
          </Button>
        </div>
        <div>
          <Button colour="clear">Clear</Button>
          <Button colour="white">White</Button>
          <Button colour="grey">Gray</Button>
          <Button colour="yellow">Yellow</Button>
        </div>
        <div>
          <Button active={true}>Active</Button>
        </div>
        <div>
          <Button className="order_load_form__button" type="submit">
            Class Name
          </Button>
        </div>
      </div>
    );
  });

  it('Should perform a designated action when clicked', () => {
    cy.getBySel('small-button').click();
  });

  it('Can not be interacted with if disabled', () => {
    cy.getBySel('disabled-button').should('be.disabled');
  });
});
