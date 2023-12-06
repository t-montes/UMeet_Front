import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Customization from './Customization';
import AppContext from "../AppContext";

jest.mock('../AppContext');

describe('Customization', () => {
  const mockLoadSettings = jest.fn();

  // Mock context value
  const mockContextValue = {
    token: "test-token",
    loadSettings: mockLoadSettings,
    langSet: {
      "Personalize": "Personalizar",
      "ScheduleCustomization": "Personalización del Horario",
      "LastDay": "Último Día",
      "StartTime": "Hora de Inicio",
      "EndTime": "Hora de Fin",
      "EnableGrid": "Activar Cuadrícula",
      "StartTimeGreaterThanEndTime": "La hora de inicio no puede ser mayor que la hora de fin"
    }
  };

  // Test Wrapper
  const TestWrapper = ({ children }) => {
    return (
      <AppContext.Provider value={mockContextValue}>
        {children}
      </AppContext.Provider>
    );
  };

  it('should display schedule customization options', async () => {
    mockLoadSettings.mockResolvedValue({
      startHour: 8,
      endHour: 18,
      lastLaborDay: 5,
      enableGrid: true
    });

    render(<Customization />, { wrapper: TestWrapper });

    await act(async () => {});

    // Verificar que los elementos estén en el documento
    expect(screen.getByText(mockContextValue.langSet.Personalize)).toBeInTheDocument();
  });

  // Aquí puedes agregar más pruebas según las funcionalidades de tu componente
});