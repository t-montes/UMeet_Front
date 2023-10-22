import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import GroupCard from './GroupCard';
import { act } from 'react-dom/test-utils';


/* -------------------------- SETUP -------------------------- */
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

/* -------------------------- RENDERING -------------------------- */

test("renders GroupCard with given colors and text", () => {
    const { container } = render(<GroupCard colorFondo="red" colorTexto="white" textoCentral="Group A" imagenesPerfil={[]} />);
    const card = screen.getByText("Group A");
    expect(container.firstChild).toHaveStyle("background-color: red");
    expect(container.firstChild).toHaveStyle("color: white");
    expect(card).toBeInTheDocument();
});

test("renders up to 3 profile images", () => {
    const mockImages = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
    render(<GroupCard colorFondo="red" colorTexto="white" textoCentral="Group A" imagenesPerfil={mockImages} />);
    const displayedImages = screen.getAllByRole("img");
    expect(displayedImages).toHaveLength(3);
});

/* -------------------------- BEHAVIOUR -------------------------- */

test("navigates to the group page on click", () => {
    render(
    <MemoryRouter initialEntries={["/group/Group A"]}>
        <Routes>
            <Route path="/group/:groupId" element={<div>Group Page</div>} />
        </Routes>
        <GroupCard colorFondo="red" colorTexto="white" textoCentral="Group A" imagenesPerfil={[]} />
    </MemoryRouter>
    );
    
    const card = screen.getByText("Group A");
    act(() => {
        fireEvent.click(card);
    });
    
    expect(mockNavigate).toHaveBeenCalledWith("/group/Group A", expect.anything());
});