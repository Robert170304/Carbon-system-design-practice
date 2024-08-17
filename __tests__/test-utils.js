import { render } from "@testing-library/react";

// Add in any providers here if necessary:
const Providers = ({ children }) => {
  return children;
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

describe("Test Utility Functions", () => {
  it("should return true", () => {
    expect(true).toBe(true);
  });
});

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
