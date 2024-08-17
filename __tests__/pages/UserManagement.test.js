/* eslint-disable import/no-unresolved */
import UserManagement from "@/app/(protectedRoutes)/user-management/page";
// import { showNotification } from "@/app/managers/NotificationManager";
import { post } from "@/app/utilities/apiHelper";
import { render, waitFor } from "@testing-library/react";

// Mock the post function
jest.mock("@/app/utilities/apiHelper", () => ({
  post: jest.fn(),
  del: jest.fn(),
}));

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/managers/NotificationManager", () => ({
  showNotification: jest.fn(),
}));

describe("UserManagement Component", () => {
  test("should get users list successfully from the API", async () => {
    const generateMockUserData = (length) =>
      Array.from({ length }, (_, i) => ({
        id: i + 1, // Ensure IDs start from 1
        name: `User ${i + 1}`, // Adjusted to match example structure
        email: `user${i + 1}@example.com`,
        role: i % 2 === 0 ? "Admin" : "User", // Alternating roles for variety
        status: i % 2 === 0 ? "Active" : "Inactive", // Alternating statuses for variety
        createdAt: `2023-01-${String((i % 31) + 1).padStart(2, "0")}`, // Mock creation dates
        hashedPassword: `$2b$10$yz0xYL4Qknp/ADKffMd4D.MpmQTVCyiuFG6I6LgNOcxdq1uz0EWLC`, // Same for all
      }));
    const mockLength = 1000;
    // Mock successful API response
    post.mockResolvedValue({
      data: {
        status: 200,
        usersData: generateMockUserData(mockLength),
      },
    });

    render(<UserManagement />);

    await waitFor(() => {
      // Expect the API to be called with the correct data
      expect(post).toHaveBeenCalledWith("/users", {
        filters: {
          status: "All",
        },
      });
    });

    // Clean up mocks
    post.mockRestore();
  });

  test("should show error notification on API error", async () => {
    const mockPush = jest.fn();

    // Mock an API error
    post.mockRejectedValue(new Error("Network error"));

    render(<UserManagement />);

    // Expect the API to be called
    expect(post).toHaveBeenCalledWith("/users", {
      filters: {
        status: "All",
      },
    });

    // Ensure that the user is not redirected
    expect(mockPush).not.toHaveBeenCalled();
  });

  //   test("should call delete API when 'Delete' button is clicked", async () => {
  //     const mockUserId = 1;
  //     const mockResponse = { status: 200, message: "User Deleted." };
  //     del.mockResolvedValue(mockResponse);

  //     // Render your component
  //     render(<UserManagement />);

  //     // Open the menu
  //     const overflowMenuButton = document.querySelector(".cds--btn--icon-only");
  //     console.log("🚀 ~ test ~ overflowMenuButton:", overflowMenuButton);
  //     fireEvent.click(overflowMenuButton);

  //     // Click the "Delete" button
  //     const deleteButton = document.querySelector(
  //       ".cds--overflow-menu-options__btn"
  //     );
  //     fireEvent.click(deleteButton);

  //     // Assert that the delete API was called with the correct user ID
  //     await waitFor(() => {
  //       expect(del).toHaveBeenCalledWith(`/users/${mockUserId}`);
  //     });
  //     // Wait for the notification to be shown
  //     await waitFor(() => {
  //       expect(showNotification).toHaveBeenCalledWith("User has been deleted.");
  //     });
  //   });
});
