/* eslint-disable import/no-unresolved */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Login from "@/app/(publicRoutes)/login/page";
import apiHelper, { post } from "@/app/utilities/apiHelper";

// Mock the post function
jest.mock("@/app/utilities/apiHelper", () => ({
  post: jest.fn(),
}));

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should log in successfully and redirect to /user-management", async () => {
    const mockPush = jest.fn();

    // Mock successful API response
    const mockPost = jest.spyOn(apiHelper, "post").mockResolvedValue({
      data: {
        status: 200,
        token: "mockToken",
        user: {
          id: 1,
          name: "John Doe",
          email: "test@example.com",
          role: "Admin",
          status: "Active",
          createdAt: "2023-01-01",
          hashedPassword:
            "$2b$10$yz0xYL4Qknp/ADKffMd4D.MpmQTVCyiuFG6I6LgNOcxdq1uz0EWLC",
        },
        message: "User found",
      },
    });

    useRouter.mockReturnValue({ push: mockPush });

    // Mock localStorage.setItem
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    render(<Login />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Test@1234" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Login"));

    // Expect the API to be called with correct data
    expect(post).toHaveBeenCalledWith("/login-user", {
      user: {
        email: "test@example.com",
        password: "Test@1234",
      },
    });

    // Wait for async code to complete
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/user-management");
    });

    // Check that the user data is saved to localStorage
    expect(setItemSpy).toHaveBeenCalledWith(
      "userData",
      JSON.stringify({
        token: "mockToken",
        id: 1,
        name: "John Doe",
        email: "test@example.com",
        role: "Admin",
        status: "Active",
        createdAt: "2023-01-01",
        hashedPassword:
          "$2b$10$yz0xYL4Qknp/ADKffMd4D.MpmQTVCyiuFG6I6LgNOcxdq1uz0EWLC",
      })
    );

    // Clean up mocks
    mockPost.mockRestore();
    setItemSpy.mockRestore();
  });

  test("should show error notification on failed login", async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    // Mock failed API response
    post.mockResolvedValue({
      status: 401,
      message: "Invalid credentials",
    });

    render(<Login />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Wrong@Passw0rd" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Login"));

    // Expect the API to be called with incorrect data
    expect(post).toHaveBeenCalledWith("/login-user", {
      user: {
        email: "wrong@example.com",
        password: "Wrong@Passw0rd",
      },
    });

    // Ensure that the user is not redirected
    expect(mockPush).not.toHaveBeenCalled();
  });

  test("should show error notification on API error", async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    // Mock an API error
    post.mockRejectedValue(new Error("Network error"));

    render(<Login />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Test@1234" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Login"));

    // Expect the API to be called
    expect(post).toHaveBeenCalledWith("/login-user", {
      user: {
        email: "test@example.com",
        password: "Test@1234",
      },
    });

    // Ensure that the user is not redirected
    expect(mockPush).not.toHaveBeenCalled();
  });
});
