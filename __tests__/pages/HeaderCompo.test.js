import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import HeaderCompo from "@/components/Header/HeaderCompo";

// Mocking matchMedia before tests
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("HeaderCompo", () => {
  it("should render without crashing", () => {
    render(<HeaderCompo />);
    expect(screen.getByLabelText("Carbon Tutorial")).toBeInTheDocument();
  });

  it("should toggle side navigation", () => {
    const { container } = render(<HeaderCompo />);
    const menuButton = screen.getByLabelText("Open menu");

    // Simulate click to expand
    fireEvent.click(menuButton);

    // Assert the sidebar is now expanded
    expect(
      container.querySelector(".cds--side-nav--expanded")
    ).toBeInTheDocument();

    // Simulate click to collapse
    fireEvent.click(menuButton);

    // Assert the sidebar is no longer expanded
    expect(
      container.querySelector(".cds--side-nav--expanded")
    ).not.toBeInTheDocument();
  });

  it("should navigate to the login page when the avatar is clicked", () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    render(<HeaderCompo />);

    const avatarButton = screen.getByLabelText("Profile");
    fireEvent.click(avatarButton);
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should navigate to the user management page when the user-management nav link is clicked", () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    render(
      <RouterContext.Provider value={{ push: mockPush }}>
        <HeaderCompo />
      </RouterContext.Provider>
    );

    const userManagementLink = screen.getAllByText("User Management");
    fireEvent.click(userManagementLink[0].closest("a"));
    expect(mockPush).toHaveBeenCalledWith(
      "/user-management",
      expect.anything()
    );
  });
});
