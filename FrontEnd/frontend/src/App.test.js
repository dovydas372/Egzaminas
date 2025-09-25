import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => ({
  MemoryRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ children }) => <a>{children}</a>,
  Navigate: () => <div>Navigate</div>,
}));

test("App renderuoja be klaidų", () => {
  render(<App />);

  expect(screen.getByText(/signup/i)).toBeInTheDocument();
});

test("App turi login puslapį", () => {
  render(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
