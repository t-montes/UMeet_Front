import { render, screen, act } from '@testing-library/react';
import AppContext from '../AppContext';
import GroupsPage from './GroupsPage';

jest.mock('@itseasy21/react-elastic-carousel', () => {
    return ({ renderArrow, children }) => (
      <div>
        {renderArrow({ type: "PREV", onClick: jest.fn() })}
        {renderArrow({ type: "NEXT", onClick: jest.fn() })}
        {children}
      </div>
    );
  });
  
jest.mock('../GroupCard/GroupCard', () => {
  return ({ textoCentral }) => <div>{textoCentral}</div>;
});

const mockLoadGroups = jest.fn();

const mockGroups = [
  {
    colorFondo: "red",
    textoCentral: "Group1",
    imagenesPerfil: ["img1.jpg"],
    colorTexto: "black"
  },
  {
    colorFondo: "blue",
    textoCentral: "Group2",
    imagenesPerfil: ["img2.jpg"],
    colorTexto: "white"
  }
];

describe('GroupsPage', () => {
    beforeEach(() => {
      mockLoadGroups.mockClear();
    });
  
    it('renders the component', async () => {
      mockLoadGroups.mockResolvedValueOnce(mockGroups);
      await act(async () => {
        render(
          <AppContext.Provider value={{ loadGroups: mockLoadGroups }}>
            <GroupsPage />
          </AppContext.Provider>
        );
      });
  
      expect(screen.getByRole('button', { name: 'flechaIzq' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'flechaDer' })).toBeInTheDocument();
    });
  
    it('renders the GroupCard components', async () => {
      mockLoadGroups.mockResolvedValueOnce(mockGroups);
      await act(async () => {
        render(
          <AppContext.Provider value={{ loadGroups: mockLoadGroups }}>
            <GroupsPage />
          </AppContext.Provider>
        );
      });
  
      const groupCards = await screen.findAllByText(/Group\d/);
      expect(groupCards).toHaveLength(2);
    });
  });
  
