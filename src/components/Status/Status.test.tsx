import { render, screen, fireEvent } from "@testing-library/react";

import Status from "./Status";
import { GAME_STATUS } from "../../constants";

describe("Tests for Status component", () => {
    const mockHandleFaceClick = jest.fn();

    it("Renders the status component correctly", () => {
        render(
            <Status
                status={GAME_STATUS.PLAYING}
                handleFaceClick={mockHandleFaceClick}
                testId="mock-id"
            />
        );
        const statusElement = screen.getByTestId("mock-id");
        expect(statusElement).toBeInTheDocument();
    });

    it("Calls handleFaceClick when the status component is clicked", () => {
        render(
            <Status
                status={GAME_STATUS.WON}
                handleFaceClick={mockHandleFaceClick}
                testId="mock-id"
            />
        );
        const statusElement = screen.getByTestId("mock-id");
        fireEvent.click(statusElement);
        expect(mockHandleFaceClick).toHaveBeenCalled();
    });
});
